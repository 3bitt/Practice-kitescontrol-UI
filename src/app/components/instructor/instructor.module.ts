import { FormsModule } from '@angular/forms';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorAddComponent } from './instructor-add/instructor-add.component';
import { InstructorService } from './service/instructor.service';


@NgModule({
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    InstructorAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InstructorRoutingModule
  ],
  providers: [InstructorService]
})
export class InstructorModule { }
