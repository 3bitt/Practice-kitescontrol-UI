import { debounceTime } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { ScheduleService } from 'src/app/service/schedule/schedule.service';
import { formatDate } from '@angular/common';
import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-date-switcher',
  templateUrl: './date-switcher.component.html',
  styleUrls: ['./date-switcher.component.css']
})
export class DateSwitcherComponent implements OnInit, OnChanges, OnDestroy {

  subscription$: Subscription;

  @Input('scheduleDate') dateFromParent: Date;
  @Output() dateChangedEvent = new EventEmitter();
  debouncer: Subject<any> = new Subject<any>();
  scheduledate: Date;

  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  constructor(
    private scheduleService: ScheduleService,
  ) {}


  ngOnInit(): void {
    this.scheduledate = new Date();
    this.subscription$ = this.debouncer.pipe(debounceTime(500)).
    subscribe((value) => this.scheduleService.scheduleSubject.next(value))
  }
  ngOnChanges(){
    this.scheduledate = this.dateFromParent;
  }
  ngOnDestroy(): void {
    this.subscription$ ? this.subscription$.unsubscribe() : null;
  }

  nextDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() + 1)
      );
    this.dateChangedEvent.next(this.scheduledate)

    // Send schedule refresh 'request' with date
    this.debouncer.next(
      formatDate(this.scheduledate.toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL'))
  }

  previousDay(){
    this.scheduledate = new Date(
      this.scheduledate.setDate(
        this.scheduledate.getDate() - 1)
      );
      this.dateChangedEvent.next(this.scheduledate)

    // Send schedule refresh 'request' with date
    this.debouncer.next(
      formatDate(this.scheduledate.toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL'))

    // this.debouncer.next(() =>
    //   this.scheduleService.scheduleSubject.next(
    //     formatDate(this.scheduledate.toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL'))
    // )
  }

}
