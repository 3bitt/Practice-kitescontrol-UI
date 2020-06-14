import { SafePipe } from './safe.pipe';
import { Component, OnInit, Pipe, ViewChild, AfterViewInit } from '@angular/core';

import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, AfterViewInit {

  progno: string =
  `<img src=http://www.meteo.pl/um/metco/mgram_pict.php?ntype=0u&amp;fdate=2020032612&amp;row=339&amp;col=206&amp;lang=pl"
   class="transparent shrinkToFit" width="556" height="583">`



  @ViewChild('forecast') elRef;


  constructor() { }



  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
