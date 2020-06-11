import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorAddComponent } from './instructor-add/instructor-add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InstructorDetailEditComponent } from './instructor-detail/instructor-detail-edit/instructor-detail-edit.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    InstructorAddComponent,
    InstructorDetailEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InstructorRoutingModule,
    FontAwesomeModule,
    MatCheckboxModule,

  ],
  // It seems like it's sufficient to declare InstructorService in AppModule - it works
  // providers: [InstructorService]
})
export class InstructorModule { }
