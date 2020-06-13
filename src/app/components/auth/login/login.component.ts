import { catchError, throttleTime, debounceTime, distinctUntilChanged, tap, map, filter, switchMap } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  message: string;
  errorMessage: boolean = false;
  subscription$: Subscription;


  constructor(public authService: AuthService,
              public router: Router ) {

                this.setMessage();
              }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }


  login(username: string, password: string) {

    this.subscription$ = this.authService.login({username, password}).
    subscribe(
      () => {
        if(this.authService.isLoggedIn()){
          this.errorMessage = false;
          this.router.navigate(['app/dashboard'])
        } else {
          this.errorMessage = true
        }
      },
      error => catchError(error)
      )
  }

  ngOnDestroy(){
    this.subscription$.unsubscribe()
  }
}
