import { InstructorService } from './service/instructor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InstructorListComponent,
    InstructorDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [InstructorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
