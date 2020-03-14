import { IgetResponse } from './../../models/response';
import { IInstructor } from './../../models/instructorModel';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/service/instructor.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  public instructors: IgetResponse;

  constructor(private _instructorService: InstructorService) { }

  // ngOnInit() {
  //   this._instructorService.getInstructors()
  //   .subscribe(data => this.instructors = data);
  // }


  ngOnInit() {
    this._instructorService.getInstructors()
    .subscribe((data: any) => { this.instructors = data;
      console.log(this.instructors);
    }, err => {
      console.log(err);
    });
  }
}
