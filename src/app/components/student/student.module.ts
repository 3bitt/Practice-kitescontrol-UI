import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentService } from 'src/app/service/student/student.service';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule

  ],
  providers: [StudentService]
})
export class StudentModule { }
