import { ScheduleService } from './../../service/schedule/schedule.service';
import { CreateLessonDialogComponent } from './create-lesson-dialog/create-lesson-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleControllerComponent } from './schedule-controller/schedule-controller.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { StudentService } from 'src/app/service/student/student.service';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { ScheduleLessonComponent } from './schedule-lesson/schedule-lesson.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ScheduleLessonPositionPipe } from 'src/app/shared/pipes/lesson-schedule-position.pipe';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DateSwitcherComponent } from './date-switcher/date-switcher.component';
import { EditLessonDialogComponent } from './edit-lesson-dialog/edit-lesson-dialog.component';
import { FinishLessonDialogComponent } from './finish-lesson-dialog/finish-lesson-dialog.component';

@NgModule({

  declarations: [
    ScheduleControllerComponent,
    ScheduleComponent,
    ScheduleLessonComponent,
    CreateLessonDialogComponent,
    ScheduleLessonPositionPipe,
    DateSwitcherComponent,
    EditLessonDialogComponent,
    FinishLessonDialogComponent
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    MatDialogModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    // LessonSchedulePositionPipe

  ],
  exports: [
    ScheduleComponent,
  ],
  providers: [
    LessonService,
    StudentService,
    InstructorService,
    ScheduleService
  ],
})
export class ScheduleModule { }
