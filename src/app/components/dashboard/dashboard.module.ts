import { InstructorModule } from './../instructor/instructor.module';
import { StudentModule } from './../student/student.module';
import { NavigationComponent } from './../navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    StudentModule,
    InstructorModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
