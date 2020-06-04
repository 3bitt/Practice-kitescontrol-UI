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


  constructor(
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) { }


  // callWG(){
  //   (function (window, document) {
  //     var loader = function () {
  //       var arg = ["s=500755","m=21","uid=wg_fwdg_500755_21_1590607346171","wj=knots","tj=c","odh=0","doh=24","fhours=240","vt=forecasts","lng=en",
  //      "p=WINDSPD,GUST,MWINDSPD,SMER,TMPE,FLHGT,CDC,APCP1s,RATING"];
  //       var script = document.createElement("script");
  //       var tag = document.getElementsByTagName("script")[0];
  //       script.src = "https://www.windguru.cz/js/widget.php?"+(arg.join("&"));
  //       tag.parentNode.insertBefore(script, tag);
  //     };
  //     window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
  //   })(window, document);
  // }

  ngAfterViewInit(): void {
    // console.log(this.elRef);
    // this.elRef.nativeElement.innerHTML = this.script;
  }

  ngOnInit(): void {

    // const s = this.renderer2.createElement('script');
    // s.type = 'text/javascript';
    // s.src = 'src/dist/script.js';
    // s.text = ``;
    // this.renderer2.appendChild(this._document.body, s);
  }

}
