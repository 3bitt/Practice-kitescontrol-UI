import { AuthGuard } from './../auth/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home.component';


const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [

          { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'students', loadChildren: () => import('../student/student.module').then(m => m.StudentModule) },
          { path: 'instructors', loadChildren: () => import('../instructor/instructor.module').then(m => m.InstructorModule) },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

    ]}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
