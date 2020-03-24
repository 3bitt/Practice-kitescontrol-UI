import { AuthGuard } from './../auth/guard/auth.guard';
import { AuthService } from './../auth/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(public authService: AuthService) { }

  logout(){
    this.authService.logout();
  }

}
