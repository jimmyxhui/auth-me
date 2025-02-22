// app/services/auth.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { action } from '@ember/object';

export default class AuthService extends Service {
  @tracked
  currentUser;
  userManager;
  @tracked
  roles;

  constructor() {
    super(...arguments);

    this.userManager = new UserManager({
      authority: 'https://localhost:18443/realms/jxhui',
      client_id: 'root',
      redirect_uri: `${window.location.origin}/callback`,
      response_type: 'code',
      scope: 'openid roles',
      post_logout_redirect_uri: `${window.location.origin}/logout-callback`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      loadUserInfo: true, // Ensure user info is loaded
    });

    this.userManager.events.addUserLoaded((user) => {
      this.currentUser = user;

      this.roles = this.getRoles(user);
    });

    this.userManager.events.addUserUnloaded(() => {
      this.currentUser = null;
      this.roles = null;
    });

    this.userManager.getUser().then((user) => {
      if (user) {
        this.currentUser = user;
        this.roles = this.getRoles(user);
      }
    });
  }

  getRoles(user) {
    // Assuming roles are included in the ID token or access token
    const idToken = user?.id_token;
    const accessToken = user?.access_token;

    if (idToken) {
      const idTokenPayload = JSON.parse(atob(idToken.split('.')[1]));
      return idTokenPayload.roles || [];
    }

    if (accessToken) {
      const accessTokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      return accessTokenPayload.roles || [];
    }

    return [];
  }

  @action
  async login() {
    await this.userManager.signinRedirect();
  }

  @action
  async logout() {
    await this.userManager.signoutRedirect();
  }

  @action
  async handleCallback() {
    await this.userManager.signinRedirectCallback();
  }

  @action
  async handleLogoutCallback() {
    await this.userManager.signoutRedirectCallback();
  }

  get accessToken() {
    return this.currentUser?.access_token;
  }

  get isAuthenticated() {
    return !!this.currentUser && !this.currentUser.expired;
  }
}
