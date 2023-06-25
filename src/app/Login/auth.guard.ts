
import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateFn {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivateFn(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Check if user is logged in
    if (!this.loginService.isLoggedIn()) {
      // User is not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user has necessary permissions
    const requiredPermission = route.data['permission'];
    if (!this.loginService.hasPermission(requiredPermission)) {
      // User does not have necessary permissions, redirect to unauthorized page
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // User is logged in and has necessary permissions, allow access
    return true;
  }
}
