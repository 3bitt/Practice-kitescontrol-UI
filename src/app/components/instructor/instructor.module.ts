import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorAddComponent } from './instructor-add/instructor-add.component';


@NgModule({
  declarations: [
    InstructorListComponent,
    InstructorDetailComponent,
    InstructorAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InstructorRoutingModule,
  ],
  // It seems like it's sufficient to declare InstructorService in AppModule - it works
  // providers: [InstructorService]
})
export class InstructorModule { }
