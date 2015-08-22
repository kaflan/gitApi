/* angular Global*/
(function() {
  'use strict';
  var list = null;
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);
  var number;
  //#/codeception/codeception/issue/238 

  function saveStorage() {
    localStorage.setItem('list', JSON.stringify(list));
  }

  function loadStorage() {
    list = JSON.parse(localStorage.getItem('list'));
  }
  app.controller('ListIssuesCtrl', function($scope, getListIssues, parseUrl, getIssuesInfo) {
    $scope.org = parseUrl.org;
    $scope.repo = parseUrl.repo;
    $scope.number = getIssuesInfo;
    //load storage
    if (list !== null) {
      $scope.data = list;
    } else {
      getListIssues.query().then(function(data) {
        $scope.data = angular.copy(data);
        console.log($scope.data);
      });
    }
    console.log('I \'m here');
  });

  // Issuess  ctrl
  app.controller('IssuesCtrl', function($scope, getListIssues, getIssuesInfo) {
    $scope.number = Number(getIssuesInfo.number);
    var number = $scope.number;
    getListIssues.query().then(function() {
      var issue = list.filter(function(item) {
        return item.number === number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    });
  });
  // comments ctrl
  app.controller('CommentsCtrl', function() {

  });

  app.config(['$routeProvider',
    function($routeProvider) {
      //costile 
      $routeProvider
        .when(':/org/:repo/issues', {
          templateUrl: 'template/nav.html',
          controller: 'ListIssuesCtrl'
        })
        .when('/:org/:repo/issues/:number', {
          templateUrl: 'template/issues.html',
          controller: 'IssuesCtrl'
        })
        .otherwise( {temlpate:'<h1> NO page here<h1>'});
    }
  ]);
  // get issues
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
  app.factory('getListIssues', function($http, parseUrl) {
    var url = 'https://api.github.com/repos/' + parseUrl.org + '/' + parseUrl.repo + '/issues';
    return {
      query: function() {
        return $http.get(url).then(function(res) {
          list = angular.copy(res.data);
          // list = $scope.data;
          saveStorage();
          return list;
        });
      }
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