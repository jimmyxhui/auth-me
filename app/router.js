import EmberRouter from '@ember/routing/router';
import config from 'auth-me/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}
// app/router.js
Router.map(function () {
  this.route('login');
  this.route('authenticated', { path: '' }, function () {
    // all routes that require the session to be authenticated
  });
  this.route('callback');
  this.route('logout-callback');
});
