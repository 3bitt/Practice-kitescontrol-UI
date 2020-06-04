import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');

    return this.checkLogin();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }


  checkLogin(): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = '/dashboard';

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }


              // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   let url: string = state.url;
  //   // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.checkLogin(url);
  // }

  // checkLogin(url: string): boolean {
  //   if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }

}
