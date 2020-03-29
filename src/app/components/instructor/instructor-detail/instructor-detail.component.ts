import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { IInstructorDetailResponse } from 'src/app/shared/API-response/IInstructorResponse';

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



  ngOnInit() {
    // ----- Reuse view if there would be student previous/next buttons ----

    this.instructor$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._instructorService.getInstructorById( parseInt(params.get('id') )
        )))
        .subscribe(data => this.instructor = data);
    };
    ngOnDestroy(){
      this.instructor$.unsubscribe();
    };
  }

