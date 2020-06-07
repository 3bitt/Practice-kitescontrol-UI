import { SchoolService } from './../../../service/school/school.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { IHours } from './model/IHours';
import {faPlus, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-instructor-payments',
  templateUrl: './instructor-payments.component.html',
  styleUrls: ['./instructor-payments.component.css']
})
export class InstructorPaymentsComponent implements OnInit, OnDestroy {

  constructor(private schoolService: SchoolService) { }


  private subscription: Subscription;

  faCalendar = faCalendarAlt;

  currDateAsString: string;
  currDateAsDate: Date;

  pastDateAsString: string;
  pastDateAsDate: Date;
  // 604800000 - 7 days
  // 6904800000 - for testing
  oneWeekCalc = 604800000;

  fromDateInput;
  toDateInput;
  enableSearch = false;


  initialData: [] = [];
  aggregatedData: IHours[] = []



  ngOnInit(): void {
    this.currDateAsString = this.toDateInput = formatDate(new Date().toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL')
    this.currDateAsDate = new Date();
    this.pastDateAsString = this.fromDateInput = formatDate(new Date(Date.now() - this.oneWeekCalc).toLocaleDateString().slice(0,10), 'yyyy-MM-dd', 'pl_PL')
    this.pastDateAsDate = new Date(Date.now() - this.oneWeekCalc)

    this.subscription = this.schoolService.getInstructorHours(this.pastDateAsString, this.currDateAsString).
    subscribe(
      (data: any) => { this.initialData = data },
      err         => { console.log("error", err) },
      ()          => { this.onSubscriptionComplete(this.initialData) }
    );

    }


  onSubscriptionComplete(fetchedData: []){
    this.aggregatedData = [];
    fetchedData.forEach(item => this.aggregateData(item));
  }

  aggregateData(arg: IHours){
    let existing = this.aggregatedData.find((existing: IHours) => existing.id === arg.id)

    if  (!existing){
      this.aggregatedData.push(arg)

    } else if (existing){
      let existingIndex = this.aggregatedData.indexOf(existing);
      this.aggregatedData[existingIndex].single_hours += arg.single_hours
      this.aggregatedData[existingIndex].group_hours += arg.group_hours
    }
  }

  searchInstructorFundings(dateFrom, dateTo){
    this.subscription = this.schoolService.getInstructorHours(dateFrom, dateTo).
    subscribe(
      (data: any) => { this.initialData = data },
      err         => { console.log("error", err) },
      ()          => { this.onSubscriptionComplete(this.initialData) }
    );

  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
