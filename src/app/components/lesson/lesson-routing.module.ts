import { LessonAddComponent } from './lesson-add/lesson-add.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonComponent } from './lesson.component';


const routes: Routes = [
  {
    path: '', component: LessonComponent,
    children: [
      {
        path: '', component: LessonListComponent,
      },
      { path: 'add-lesson', component: LessonAddComponent},
      { path: ':id', component: LessonDetailComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
