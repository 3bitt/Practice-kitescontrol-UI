import { IgetInstructorByIdResponse } from '../../../models/response';
import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {


  public instructor;  //: IgetInstructorByIdResponse;
  public instructorId;

  constructor(private _instructorService: InstructorService,
              private route: ActivatedRoute) { }



  ngOnInit() {
    // Get id from URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.instructorId = id;
    })
    // Call API
    this._instructorService.getInstructorById(this.instructorId)
    .subscribe((data: any) => { this.instructor = data
    }, err => {
      console.log(err);
    });
  }



}
