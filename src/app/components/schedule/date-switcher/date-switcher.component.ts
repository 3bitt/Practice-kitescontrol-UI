import { Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { formatDate } from '@angular/common';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.css']
})
export class DateSwitcherComponent implements OnInit, OnChanges {

  constructor(
    private scheduleService: ScheduleService
  ) { }


  subscription$: Subscription;

  @Input('scheduleDate') dateFromParent: Date;
  scheduledate: Date;

  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  ngOnInit(): void {
    this.scheduledate = new Date();
  }

  ngOnDestroy(): void {
    if (this.subscription$){
      this.subscription$.unsubscribe();
    }
  }

  nextDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() + 1)
      );

    // Send schedule refresh 'request' with date
    this.scheduleService.scheduleSubject.next(
      this.scheduledate.toISOString().slice(0,10))
  }

  previousDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() - 1)
      );

    // Send schedule refresh 'request' with date
    this.scheduleService.scheduleSubject.next(
      this.scheduledate.toISOString().slice(0,10))
  }

  ngOnChanges(){
    this.scheduledate = this.dateFromParent;
  }

}
