'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'auth-me',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },
    'ember-simple-auth': {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'index',
      routeIfAlreadyAuthenticated: 'index',
    },
    // 'ember-simple-auth-auth0': {
    //   clientID: 'auth-me', // Keycloak client ID
    //   domain: 'https://keycloak.localhost/realms/myrealm', // Keycloak domain, e.g., 'http://localhost:8080/auth/realms/your-realm'
    //   logoutReturnToURL: 'http://localhost:4200', // URL to redirect to after logout
    //   responseType: 'code',
    //   audience: 'your-audience',
    //   redirectURI: 'http://localhost:4200',
    // },
    // 'ember-simple-auth-oidc': {
    //   host: 'https://keycloak.localhost/realms/myrealm/protocol/openid-connect',
    //   clientId: 'auth-me',
    //   authEndpoint:
    //     'https://keycloak.localhost/realms/myrealm/protocol/openid-connect/auth',
    //   tokenEndpoint:
    //     'https://keycloak.localhost/realms/myrealm/protocol/openid-connect/token',
    //   userinfoEndpoint:
    //     'https://keycloak.localhost/realms/myrealm/protocol/openid-connect/userinfo',
    // },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
