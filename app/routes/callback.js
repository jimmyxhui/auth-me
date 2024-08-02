// app/routes/callback.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CallbackRoute extends Route {
  @service auth;
  @service router;

  async beforeModel() {
    await this.auth.handleCallback();

    this.router.transitionTo('application');
  }
}
