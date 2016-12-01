'use strict';

const init = function init() {
  getData();
};

//Notkun: getData()
//Fyrir: ekkert
//Eftir: búið er að hreinsa töfluna á forsíðunni
//      og skrifa út nú gögn sem sótt eru í gegnum API.

const getData = function getData() {
  $('#results-table').html(' ');
  $.get("http://apis.is/sports/football", function (data) {
    data.results.map(function (football) {
      if (football.undefined !== undefined) {
        $('#results-table').append("<tr><td>" + football.date + "</td><td>" + football.homeTeam + "</td><td>" + football.awayTeam + "</td><td>" + football.undefined + "</td>");
      }
    });
  });
};

window.fbAsyncInit = function () {
    let FB
    FB.init({
    appId: '1885031941730254',
    xfbml: true,
    version: 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  let js,
      fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);js.id = id;
  js.src = "//connect.facebook.net/is_IS/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

window.twttr = function (d, s, id) {
  let js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs");

init();
