(function (window, document) {
  var loader = function () {
    var arg = ["s=500755","m=21","uid=wg_fwdg_500755_21_1590607346171","wj=knots","tj=c","odh=0","doh=24","fhours=240","vt=forecasts","lng=en",
   "p=WINDSPD,GUST,MWINDSPD,SMER,TMPE,FLHGT,CDC,APCP1s,RATING"];
    var script = document.createElement("script");
    var tag = document.getElementsByTagName("script")[0];
    script.src = "https://www.windguru.cz/js/widget.php?"+(arg.join("&"));
    tag.parentNode.insertBefore(script, tag);
  };
  window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
})(window, document);
