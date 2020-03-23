import { InstructorAddComponent } from './instructor-add/instructor-add.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {path: 'instructors', component: InstructorListComponent},
  {path: 'instructors/add-instructor', component: InstructorAddComponent},
  {path: 'instructors/:id', component: InstructorDetailComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
