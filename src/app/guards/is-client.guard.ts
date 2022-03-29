import { KeycloakAuthGuard } from 'keycloak-angular';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsClientGuard  extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    if (route.data["roles"] == "CLIENT" && await this.keycloak.getUserRoles().includes("CLIENT")) {
      return true;
    }
    this.router.navigateByUrl('/home');
    return false;
  }

  
}
