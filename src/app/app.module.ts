import { HomeModule } from './components/home/home.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { AuthGuard } from './components/auth/guard/auth.guard';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { LessonListComponent } from './components/lesson/lesson-list/lesson-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InstructorService } from './service/instructor/instructor.service';
import { LessonService } from './service/lesson/lesson.service';
import { StudentService } from './service/student/student.service';




@NgModule({
  declarations: [
    AppComponent,
    // LessonListComponent,
    // LessonDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [InstructorService, StudentService, LessonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
