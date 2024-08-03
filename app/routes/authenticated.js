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

  async beforeModel() {
    if (!this.auth.isAuthenticated) {
      console.log('not authenticated');
      this.router.transitionTo('application');
    }
  }

  async model() {
    let token = this.auth.accessToken;

    try {
      let response = await fetch('http://localhost:9090/api/hello', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.text();

      return { data, currentUser: this.auth.currentUser };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}
