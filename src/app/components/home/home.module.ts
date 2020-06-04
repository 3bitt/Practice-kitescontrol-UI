import { RouterModule } from '@angular/router';
import { StudentListComponent } from './../student/student-list/student-list.component';
import { InstructorModule } from './../instructor/instructor.module';
import { StudentModule } from './../student/student.module';
import { DashboardModule } from './../dashboard/dashboard.module';
import { NavigationComponent } from './../navigation/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [RouterModule]
})
export class HomeModule { }
