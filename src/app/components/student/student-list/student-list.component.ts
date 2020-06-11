import { ConfirmDeleteDialogComponent } from './../../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { IpagingResponse } from './../../../models/response';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student/student.service';
import { IStudentPagingResponse } from 'src/app/shared/API-response/IStudentResponse';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, OnDestroy {

  public students: IStudentPagingResponse;
  public students$;
  public searchList = [];
  public searchValue = '';

  tooltipIcon = faQuestionCircle;

  hidetooltip = true;

  constructor(private _studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              ) { }


  public search(term: string){
    let regexp = new RegExp(term, 'gi')
    if (!term.trim()){
      this.searchList=[]
    } else {
    this.searchList = this.students.results
      .filter(e => e.surname.match(regexp) || e.name.match(regexp));
    }
  }

  showTooltip(){
    this.hidetooltip = false;
  }
  hideTooltip(){
    this.hidetooltip = true;
  }

  confirmDelete(studentObj){
    let dialogRef = this.dialog.open(
      ConfirmDeleteDialogComponent,
      {
        panelClass: 'dialog',
        data: {
          obj: studentObj,
          context: "student"
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      (result: any | undefined) => {
        if (result === undefined){
          return
        }
        else if (result.event === 'Delete'){
          this.deleteStudent(result.data)
        };
      }
    );
  }

  deleteStudent(id: number){
    this.students$ = this._studentService.deleteStudent(id)
    .subscribe( (data) => { this.students.results = data;
      console.log(data);
    }, err => {
      console.log('ERR:', err);
    });
  };

  searchStudents(studName: string, studSurname: string, studMobile: string){
    let payload = {
      "studentName": studName.trim(),
      "studentSurname": studSurname.trim(),
      "mobileNumber": studMobile.trim()
    };
    console.log(payload);


    this.students$ = this._studentService.getStudentsPostMethod(payload).
    subscribe(data => this.students = data,
              err => console.log('ERR:', err)
              );
  };

  ngOnInit() {
    this.students$ = this._studentService.getStudents()
    .subscribe((data) => { this.students = data
    }, err => {
      console.log('ERR:', err);
      });
  };

  ngOnDestroy(){
    this.students$.unsubscribe();
  };

}



  // Function used in template - place instructor.id in relative path /instructors/{id}
  // getInstructorDetails(student){
  //   this.router.navigate([student.id], {relativeTo: this.route})
  // }
