import { IInstructorPagingResponse } from './../../../shared/API-response/IInstructorResponse';
import { Subscription } from 'rxjs';
import { IpagingResponse } from './../../../models/response';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/confirm-delete-dialog/confirm-delete-dialog.component';



@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit, OnDestroy {

  public instructors: IInstructorPagingResponse;
  private instructors$: Subscription;
  public searchList = [];
  public searchValue = '';

  constructor(private _instructorService: InstructorService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }



  public search(term: string){
    let regexp = new RegExp(term, 'gi')
    if (!term.trim()){
      this.searchList=[]
    } else {
    this.searchList = this.instructors.results
      .filter(e => e.surname.match(regexp) || e.name.match(regexp));
    }
  }

  ngOnInit() {
    this.instructors$ = this._instructorService.getInstructors()
    .subscribe((data: IInstructorPagingResponse) => { this.instructors = data },
    err => {
      console.log(err);
    });
  };

  confirmDelete(instructorObj){
    let dialogRef = this.dialog.open(
      ConfirmDeleteDialogComponent,
      {
        panelClass: 'dialog',
        data: {
          obj: instructorObj,
          context: "instructor"
        }
      });

    dialogRef.afterClosed().subscribe(
      (result: any | undefined) => {
        if (result === undefined){
          return
        }
        else if (result.event === 'Delete'){
          this.deleteInstructor(result.data)
        };
      }
    )
  }

  deleteInstructor(id: number){
    this.instructors$ = this._instructorService.deleteInstructor(id)
    .subscribe( (data) => { this.instructors.results = data;
      console.log(data);

    }, err => {
      console.log('ERR:', err);
    });
  }

  ngOnDestroy(){
    this.instructors$.unsubscribe();
  };

  // Function used in template - place instructor.id in relative path /instructors/{id}
  // getInstructorDetails(instructor){
  //   this.router.navigate([instructor.id], {relativeTo: this.route})
  // }
}
