import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentModule } from './components/student/student.module';
import { StudentAddComponent } from './components/student/student-add/student-add.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { LessonListComponent } from './components/lesson/lesson-list/lesson-list.component';
import { InstructorDetailComponent } from './components/instructor/instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './components/instructor/instructor-list/instructor-list.component';


import {LoginComponent} from './components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  // {path: 'lessons', component: LessonListComponent},
  // {path: 'lessons/:id', component: LessonDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
