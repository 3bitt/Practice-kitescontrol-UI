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


  canActivate(){
    if (this.authService.isLoggedIn()){
      // this.router.navigate(['app/dashboard'])
      return true
    } else {
      this.router.navigate(['login']);
      return false
    }
      // return this.checkLogin();
  }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //     return this.canActivate(route, state);
  //   }


  // checkLogin(): boolean {
  //   if (this.authService.isLoggedIn) { return true; }

  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = '/dashboard';

  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }

}
