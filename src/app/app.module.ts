import { InstructorModule } from './components/instructor/instructor.module';
import { LessonService } from './service/lesson/lesson.service';
import { StudentService } from './service/student/student.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InstructorDetailComponent } from './components/instructor/instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './components/instructor/instructor-list/instructor-list.component';

import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentDetailComponent } from './components/student/student-detail/student-detail.component';
import { LessonListComponent } from './components/lesson/lesson-list/lesson-list.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { StudentAddComponent } from './components/student/student-add/student-add.component';
import { StudentModule } from './components/student/student.module';
import { InstructorService } from './components/instructor/service/instructor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavigationComponent,
    LessonListComponent,
    LessonDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StudentModule,
    InstructorModule,
    AppRoutingModule,
  ],
  providers: [InstructorService, StudentService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
