import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { IInstructorDetailResponse } from 'src/app/shared/API-response/IInstructorResponse';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit, OnDestroy {

  private instructor$: Subscription;
  public instructor: IInstructorDetailResponse;  //: IgetInstructorByIdResponse;
  public instructorId;

  constructor(private _instructorService: InstructorService,
              private route: ActivatedRoute) { }


  faCheckIcon = faCheck;
  faNoIcon = faTimes;

  editMode = false;
  editSuccess = false;

  ngOnInit() {
    // ----- Reuse view if there would be instructor previous/next buttons ----

    this.instructor$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._instructorService.getInstructorById( parseInt(params.get('id') )
        )))
        .subscribe(data => this.instructor = data);
    };


  showEdit(){
    this.editMode = true;
  }

  onReceiveEditForm(event: NgForm, instructorId?: number){
    this.instructor$ = this._instructorService.putInstructor(this.instructor.id, event.value).
    subscribe(
      data => (console.log('Success: ', data),
              this.editMode = false,
              this.editSuccess = true),

      (error: HttpErrorResponse) => (console.log('Error: ', error),
                this.editSuccess=false
                ),
    );
  }

  ngDoCheck(){
    if (this.editSuccess){
      this.instructor$ = this._instructorService.getInstructorById(this.instructor.id).
      subscribe(data => this.instructor = data);

      this.editSuccess = false;
    }
  }

  ngOnDestroy(){
    this.instructor$.unsubscribe();
  };
}

