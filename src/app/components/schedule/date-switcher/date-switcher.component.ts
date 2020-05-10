import { Subscription } from 'rxjs';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { formatDate } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.css']
})
export class DateSwitcherComponent implements OnInit, OnDestroy {

  constructor(
    private scheduleService: ScheduleService
  ) { }


  // currentdate = formatDate(new Date().toISOString().slice(0, 10), 'dd-MM-yyyy', 'pl_PL')

  subscription: Subscription;

  currentDate: Date;
  scheduledate: Date;

  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  ngOnInit(): void {
    this.currentDate = new Date();
    this.scheduledate = new Date();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  nextDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() + 1)
      );
    this.scheduleService.reloadSchedule(
      this.scheduledate.toISOString().slice(0,10));
  }

  previousDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() - 1)
      );
    this.scheduleService.reloadSchedule(
      this.scheduledate.toISOString().slice(0,10));

  }

}
