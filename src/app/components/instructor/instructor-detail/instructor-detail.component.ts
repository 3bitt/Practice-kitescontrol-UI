import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstructorService } from '../service/instructor.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit, OnDestroy {

  private instructor$: Subscription;
  public instructor;  //: IgetInstructorByIdResponse;
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

