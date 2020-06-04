import { InstructorPaymentsComponent } from './instructor-payments/instructor-payments.component';
import { SchoolComponent } from './school.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  // { path: 'payments', component: InstructorPaymentsComponent},
  { path: '', component: SchoolComponent,
    children: [
      { path: 'payments', component: InstructorPaymentsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
