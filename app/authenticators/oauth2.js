// app/authenticators/oauth2.js
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default class OAuth2Authenticator extends OAuth2PasswordGrant {
  clientId = 'test';
  serverTokenEndpoint =
    'https://keycloak.localhost/realms/myrealm/protocol/openid-connect/token';
}
