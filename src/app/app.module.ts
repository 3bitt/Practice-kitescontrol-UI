import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { AuthGuard } from './components/auth/guard/auth.guard';
import { HomeModule } from './components/home/home.module';
import { InstructorService } from './service/instructor/instructor.service';
import { LessonService } from './service/lesson/lesson.service';
import { StudentService } from './service/student/student.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { registerLocaleData, CommonModule } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

registerLocaleData(localePl, 'pl_PL');


@NgModule({
  declarations: [
    AppComponent,
    // LessonListComponent,
    // LessonDetailComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,

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


  ],
  providers: [InstructorService, StudentService, LessonService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
