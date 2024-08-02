// app/routes/logout-callback.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LogoutCallbackRoute extends Route {
  @service auth;
  @service router;

  async beforeModel() {
    await this.auth.handleLogoutCallback();
    this.router.transitionTo('application');
  }
}
