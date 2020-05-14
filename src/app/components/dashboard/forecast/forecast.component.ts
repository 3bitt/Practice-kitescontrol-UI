import { SafePipe } from './safe.pipe';
import { Component, OnInit, Pipe } from '@angular/core';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  progno: string =
  `<img src=http://www.meteo.pl/um/metco/mgram_pict.php?ntype=0u&amp;fdate=2020032612&amp;row=339&amp;col=206&amp;lang=pl"
   class="transparent shrinkToFit" width="556" height="583">`

  windguru: string = `<script id="wg_fwdg_749676_3_1585242055170">
  (function (window, document) {
    var loader = function () {
      var arg = ["s=749676","m=3","uid=wg_fwdg_749676_3_1585242055170","wj=knots","tj=c","odh=0","doh=24","fhours=96","vt=forecasts","lng=pl",
     "p=WINDSPD,GUST,SMER,TMPE,CDC,APCP1s,SLP"];
      var script = document.createElement("script");
      var tag = document.getElementsByTagName("script")[0];
      script.src = "https://www.windguru.cz/js/widget.php?"+(arg.join("&"));
      tag.parentNode.insertBefore(script, tag);
    };
    window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
  })(window, document);
  </script>
  `

  windguru2: string = `<svg>id="wg_fwdg_749676_3_1585242055170">
  (function (window, document) {
    var loader = function () {
      var arg = ["s=749676","m=3","uid=wg_fwdg_749676_3_1585242055170","wj=knots","tj=c","odh=0","doh=24","fhours=96","vt=forecasts","lng=pl",
     "p=WINDSPD,GUST,SMER,TMPE,CDC,APCP1s,SLP"];
      var script = document.createElement("script");
      var tag = document.getElementsByTagName("script")[0];
      script.src = "https://www.windguru.cz/js/widget.php?"+(arg.join("&"));
      tag.parentNode.insertBefore(script, tag);
    };
    window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
  })(window, document);
  </svg>
  `

  constructor() { }

  ngOnInit(): void {
  }

}
