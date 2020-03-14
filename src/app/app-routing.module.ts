import { InstructorDetailComponent } from './components/instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';

import {LoginComponent} from './components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'instructors', component: InstructorListComponent},
  {path: 'instructors/detail', component: InstructorDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
