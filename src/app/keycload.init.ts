import { KeycloakBearerInterceptor, KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";


export function initialize(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.uri,
        realm: 'HAYANE',
        clientId: 'Springangular'
      },

      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe:false,
        checkLoginIframeInterval:30
      },
      
      enableBearerInterceptor:true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [
        '/assets',
        '/clients/public'
      ]
    })
    //keycloak.updateToken(10)
    
    
  
}