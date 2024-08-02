// app/services/auth.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { action } from '@ember/object';

export default class AuthService extends Service {
  @tracked
  currentUser;
  userManager;

  constructor() {
    super(...arguments);

    this.userManager = new UserManager({
      authority: 'https://localhost:18443/realms/jxhui',
      client_id: 'root',
      redirect_uri: `${window.location.origin}/callback`,
      response_type: 'code',
      scope: 'openid',
      post_logout_redirect_uri: `${window.location.origin}/logout-callback`,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });

    this.userManager.events.addUserLoaded((user) => {
      this.currentUser = user;
    });

    this.userManager.events.addUserUnloaded(() => {
      this.currentUser = null;
    });

    this.userManager.getUser().then((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
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
}
