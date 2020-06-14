import { config } from './../../config/config';
import { catchError, switchMap, take, filter, throttleTime, tap } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subscription } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private subscription$: Subscription;


  constructor(public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let existingToken = this.authService.getJwtToken();

    if (existingToken) {
      request = this.addToken(request, existingToken);
    }
    return next.handle(request).pipe(catchError((error:HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && this.authService.isLoggedIn()) {

        if (this.isRefreshing) {

          return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(accessToken => {
              return next.handle(this.addToken(request, accessToken));
            }));
        } else {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.access);
              return next.handle(this.addToken(request, token.access));
            }));
        }
      } else if (error instanceof HttpErrorResponse && error.status === 401) {
          return throwError(error).pipe(
            tap(() => this.authService.redirectToLogin())
          )
      } else {
          return throwError(console.log('Interceptor throw error', error)).pipe(
            tap(() => this.authService.logout())
          );
        }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string){
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler){
    // Log out when logged in but 401 and prevent refreshing token when user did not logged in yet
    if (this.authService.isLoggedIn()){
      console.log('Token found but 401 error from interceptor - logging OUT !');

      // this.subscription$ =
      // return this.authService.logout()

    }
     else {

      if (!this.isRefreshing && this.authService.getJwtToken()) {
        console.log('REFRESHING');

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.authService.refreshToken().pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.access);
            return next.handle(this.addToken(request, token.access));
          }));

      } else {
        return this.refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(accessToken => {
            return next.handle(this.addToken(request, accessToken));
          }));
      }
    }
    // this.subscription$ ? this.subscription$.unsubscribe() : null;
  }
}
