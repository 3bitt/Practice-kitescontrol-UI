import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
   ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
