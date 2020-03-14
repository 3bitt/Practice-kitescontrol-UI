import { ActivatedRoute, ParamMap } from '@angular/router';
import { IgetInstructorByIdResponse } from './../../../models/response';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  public student;
  public studentId;

  constructor(private _studentService: StudentService,
              private route: ActivatedRoute) { }



  ngOnInit() {
    // Get id from URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.studentId = id;
    })
    // Call API
    this._studentService.getStudentById(this.studentId)
    .subscribe((data: any) => { this.student = data
    }, err => {
      console.log(err);
    });
  }

}
