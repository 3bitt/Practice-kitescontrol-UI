import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from '../student/student-list/student-list.component';
import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'students', loadChildren: () => import('../student/student.module').then(m => m.StudentModule) },
      { path: 'instructors', loadChildren: () => import('../instructor/instructor.module').then(m => m.InstructorModule) },

    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
