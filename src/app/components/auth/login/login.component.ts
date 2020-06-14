import { catchError, throttleTime, debounceTime, distinctUntilChanged, tap, map, filter, switchMap } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription, Observable, Subject, fromEvent } from 'rxjs';
import { callbackify } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: boolean = false;
  subscription$: Subscription;
  subi$: Subscription;

  subject$: Subject<any> = new Subject()


  constructor(public authService: AuthService,
              public router: Router ) {
              }


  ngOnInit(){
    this.subscription$ = this.subject$.pipe(
      throttleTime(3000)
      ).subscribe((val) => this.login(val)
      )
  }

  clickLogin(username: string, password: string){
    if (!username.trim() || !password.trim() ){
      return this.errorMessage = true
    }
    this.subject$.next({username: username, password: password})
  }

  login(userObj) {

    this.subi$ = this.authService.login(userObj).
    subscribe(
      (success) => {
        if(this.authService.isLoggedIn()){
          this.errorMessage = false;
          this.router.navigate(['app/dashboard'])
        } else {
          this.errorMessage = true
        }
      },
      (error) => {this.errorMessage = true});

  }

  ngOnDestroy(){
    this.subscription$ ? this.subscription$.unsubscribe() : null
    this.subi$ ? this.subi$.unsubscribe : null
  }
}
