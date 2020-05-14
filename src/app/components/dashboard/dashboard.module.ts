import { ScheduleModule } from './../schedule/schedule.module';
import { SafePipe } from './forecast/safe.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InstructorModule } from './../instructor/instructor.module';
import { StudentModule } from './../student/student.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForecastComponent } from './forecast/forecast.component';

// Material Table
import { MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    DashboardComponent,
    ForecastComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    ScheduleModule,
    DashboardRoutingModule,
    MatTableModule,
    ScheduleModule,
  ]
})
export class DashboardModule { }
