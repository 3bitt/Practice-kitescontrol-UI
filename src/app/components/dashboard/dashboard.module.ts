import { ScheduleComponent } from './schedule/schedule.component';
import { SafePipe } from './forecast/safe.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InstructorModule } from './../instructor/instructor.module';
import { StudentModule } from './../student/student.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForecastComponent } from './forecast/forecast.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ForecastComponent,
    SafePipe,
    ScheduleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
