import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school.component';
import { SchoolRoutingModule } from './school-routing.module';
import { InstructorPaymentsComponent } from './instructor-payments/instructor-payments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    SchoolComponent,
    InstructorPaymentsComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    MatButtonModule,
    FontAwesomeModule,
  ]
})
export class SchoolModule { }
