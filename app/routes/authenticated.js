// app/routes/callback.js
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service auth;
  @service router;

  // TODO
  //  - check if authenticated
  //  - fetch from REST endpoint
  //    - need spring boot app with auth enabled
}
