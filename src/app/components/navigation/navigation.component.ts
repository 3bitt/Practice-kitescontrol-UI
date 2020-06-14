import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from './../auth/guard/auth.guard';
import { AuthService } from './../auth/service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy{

  constructor(public authService: AuthService,
              public router: Router,
              public route: ActivatedRoute) { }

  subscription$: Subscription;

  logout(){
    this.subscription$ = this.authService.invalidateToken().subscribe();
    // this.router.navigateByUrl ('/login');
  }

  ngOnDestroy(){
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }

}
