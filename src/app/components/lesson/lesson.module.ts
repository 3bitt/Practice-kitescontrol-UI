import { FormsModule } from '@angular/forms';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonComponent } from './lesson.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonAddComponent } from './lesson-add/lesson-add.component';


@NgModule({
  declarations: [
    LessonComponent,
    LessonListComponent,
    LessonDetailComponent,
    LessonAddComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    FormsModule,
  ]
})
export class LessonModule { }
