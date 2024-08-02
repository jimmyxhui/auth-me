import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  // @service session;
  @service auth;

  // @action
  // invalidateSession() {
  //   this.session.invalidate();
  // }
}
