import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/service/instructor.service';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {

  public instructors = {}

  constructor(private _instructorService: InstructorService) { }

  ngOnInit() {
    this.instructors = this._instructorService.getInstructors();
  }

}
