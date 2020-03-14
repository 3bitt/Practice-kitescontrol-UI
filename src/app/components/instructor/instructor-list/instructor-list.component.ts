
import { IpagingResponse } from '../../../models/response';
import { IInstructor } from '../../../models/instructorModel';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  public instructors;

  constructor(private _instructorService: InstructorService,
              private router: Router,
              private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this._instructorService.getInstructors()
  //   .subscribe(data => this.instructors = data);
  // }


  ngOnInit() {
    this._instructorService.getInstructors()
    .subscribe((data: any) => { this.instructors = data
    }, err => {
      console.log(err);
    });
  };

  // Function used in template - place instructor.id in relative path /instructors/{id}
  getInstructorDetails(instructor){
    this.router.navigate([instructor.id], {relativeTo: this.route})
  }
}
