import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      const requiredRole = route.data['role'];
      if (requiredRole) {
        const userRole = this.authService.getUserRole();
        if (userRole && userRole === requiredRole) {
          return true;
        } else {
          console.log('Vous n\'avez pas les droits pour accéder à cette page', userRole, requiredRole);
          switch (userRole) {
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'proprietaire':
              this.router.navigate(['/prop-dashboard']);
              break;
            case 'veterinaire':
              this.router.navigate(['/dashboardVet']);
              break;
            case 'gardien':
                this.router.navigate(['/dashboardGard']);
                break;
            default:
              this.router.navigate(['/home']);
              break;
          }
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/accueil/login'], { queryParams: { redirectUrl: state.url } });
      return false;
    }
  }
}