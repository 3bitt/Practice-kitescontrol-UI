import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public students;

  constructor(private _studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this._studentService.getInstructors()
  //   .subscribe(data => this.instructors = data);
  // }


  ngOnInit() {
    this._studentService.getStudents()
    .subscribe((data: any) => { this.students = data
    }, err => {
      console.log(err);
    });
  };

  // Function used in template - place instructor.id in relative path /instructors/{id}
  getInstructorDetails(student){
    this.router.navigate([student.id], {relativeTo: this.route})
  }
}
