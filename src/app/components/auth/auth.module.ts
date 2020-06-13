import { TokenInterceptor } from './token.interceptor';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent,
   ],
   providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
   ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class AuthModule { }
