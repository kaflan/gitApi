(function() {
  'use strict';
  // get issues
  var app = angular.module('gitApi');
  app.service('parseUrl', function($location) {
    var pathUrl = $location.$$path;
    var regExp = /\/(\w+)\/(\w+)/;
    var loc = pathUrl.match(regExp);
    var org = loc[1];
    var repo = loc[2];
    return {
      org: org,
      repo: repo
    };
  });
  app.service('getIssuesInfo', function($location) {
    var pathUrl = $location.$$path;
    var regExp2 = /([0-9]+)/;
    var loc = pathUrl.match(regExp2);
    if (loc !== null) {
      console.log('issues info number is: ', loc[1]);
      return {
        number: loc[1]
      };
    }
  });
})();