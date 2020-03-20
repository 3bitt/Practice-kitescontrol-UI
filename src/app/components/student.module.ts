import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,

  ]
})
export class StudentModule { }
