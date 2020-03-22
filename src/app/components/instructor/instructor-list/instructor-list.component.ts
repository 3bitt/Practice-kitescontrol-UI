import { IpagingResponse } from './../../../models/response';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../service/instructor.service';



@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  public instructors;
  public searchList = [];
  public searchValue = '';

  constructor(private _instructorService: InstructorService,
              private router: Router,
              private route: ActivatedRoute) { }



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
    this._instructorService.getInstructors()
    .subscribe((data: IpagingResponse) => { this.instructors = data },
    err => {
      console.log(err);
    });
  };

  // Function used in template - place instructor.id in relative path /instructors/{id}
  // getInstructorDetails(instructor){
  //   this.router.navigate([instructor.id], {relativeTo: this.route})
  // }
}
