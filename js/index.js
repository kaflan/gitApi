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
    $scope.data;
    //load storage
    if (list !== null) {
      $scope.data = list;
    } else {
      getListIssues.query().then(function(data) {
        $scope.data = angular.copy(data);
        // return this;
        console.log($scope.data);
      });
    }
  });
  // Issuess  ctrl
  app.controller('IssuesCtrl', function($scope,getListIssues, getIssuesInfo) {

    $scope.number = getIssuesInfo;

    var all = [];
    if (list !== null) {
      all = list;
    } else {
      getListIssues.query().then(function(data) {
        all = angular.copy(data);
      });
    }
    console.log(all);
  });
  // comments ctrl
  app.controller('CommentsCtrl', function() {

  });

  app.config(['$routeProvider',
    function($routeProvider) {
      //costile 
      $routeProvider
        .when('/:org/:repo', {
          controller: 'ListIssuesCtrl'
        })
        .when(':org/:repo/issues/:number', {
          templateUrl: 'template/issues.html',
          controller: 'IssuesCtrl'
        })
        .otherwise({
          redirectTo: '/:org/:repo'
        });
    }
  ]);
  //directive
  app.directive('issues', function() {
    return {
      restrict: 'E',
      templateUrl: 'template/issues.html'
    };
  });
  app.directive('comments', function() {
    return {
      restrict: 'E',
      templateUrl: 'template/comments.html'
    };
  });

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
  app.service('getListIssues', function($http, parseUrl) {
    var url = 'https://api.github.com/repos/' + parseUrl.org + '/' + parseUrl.repo + '/issues';
    return {
      query: function() {
        return $http.get(url).then(function(res) {
          list = angular.copy(res.data);
          // list = $scope.data;
          saveStorage();
          console.log(list);
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