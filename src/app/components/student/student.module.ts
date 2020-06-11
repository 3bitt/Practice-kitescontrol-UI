import { ConfirmDeleteDialogComponent } from './../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentService } from 'src/app/service/student/student.service';
import { StudentDetailEditComponent } from './student-detail/student-detail-edit/student-detail-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,
    StudentDetailEditComponent,


  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    MatButtonModule,
    FontAwesomeModule,

  ],
  providers: [StudentService]
})
export class StudentModule { }
