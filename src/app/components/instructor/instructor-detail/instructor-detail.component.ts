import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstructorService } from '../service/instructor.service';
import { switchMap } from 'rxjs/operators';

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
    // ----- Reuse view if there would be student previous/next buttons ----

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._instructorService.getInstructorById( parseInt(params.get('id') )
        )))
        .subscribe(data => this.instructor = data);
    }
  }

