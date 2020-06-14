import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, mapTo, catchError, throttleTime, debounceTime, distinctUntilChanged, map, share } from 'rxjs/operators';
import {config} from '../../../config/config';
import { Tokens } from 'src/app/models/interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH TOKEN';
  private loggedUser: string;

  // store the URL so we can redirect after logging in
  redirectUrl: string;


  constructor(  private http: HttpClient,
                private router: Router) {}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  login(user: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(`${config.api.baseURL}/authenticateUser/`, user)
    .pipe(
      tap(tokens => this.doLoginUser(user.username, tokens)))
      // mapTo(true),
      // catchError(this.handleError))
      // mapTo(true),
  }

  invalidateToken(): Observable<any>{
    return this.http.post<any>(`${config.api.baseURL}/logout/`, {
      'refresh': this.getRefreshToken()
    })
    .pipe(
      tap(() => {this.doLogoutUser()}),
      mapTo(true))
    //   // catchError(error => {
    //   //   return of(false)})
    //     );
  }

  verifyToken(){
    return this.http.post<any>(`${config.api.baseURL}/verifyToken/`, {
      'token': this.getRefreshToken()
    }).pipe(
      catchError((error:HttpErrorResponse) => {
        console.log('verifyToken error', error);

        this.logout();
        return of(false);
      }),
      mapTo(true)
    )
  }

  logout(){
    this.doLogoutUser();
    return of(true)
  }
  redirectToLogin(){
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    if(this.getJwtToken()){
      return true;
    } else {
      return false;
    }
  }

  refreshToken(){
    return this.http.post<any>(`${config.api.baseURL}/refreshToken/`, {
      'refresh': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens);
    }));
  }

  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  storeJwtToken(token: string){
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private doLogoutUser(){
    console.log('doLogoutUser method - atuhService');

    this.loggedUser = null;
    this.removeTokens();
    this.router.navigate(['login'])
  }

  private doLoginUser(username: string, tokens: Tokens) {
    console.log(username, tokens);

    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens){
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh)
  }

  private removeTokens(){
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  // logout(): void {
  //   console.log('Logged out');

  //   this.isLoggedIn = false;
  //   console.log(this.isLoggedIn);

  //   this.redirectUrl = '/login'
  // }
}
