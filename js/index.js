/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);
  app.controller('GetListIssuesCtrl', function($scope,
    getListIssues) {
    console.log('work get list');
    getListIssues.query().then(function(data) {
      $scope.data = angular.copy(data);
    });
  });

  app.controller('IssuesCtrl', function($scope, getListIssues, $routeParams) {
    $scope.number = $routeParams.number;
    getListIssues.query().then(function(data) {
      $scope.any = data;
      var issue = $scope.any.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    });
  });

  // repo and org controller
  app.controller('SearchRepoCtrl', function($scope, $location) {
    $scope.searchRepo = function() {
      $scope.startPage = true;
      $location.path('/' + $scope.org + '/' + $scope.repo + '/issues');
    };
  });

  // comments ctrl
  app.controller('CommentsCtrl', function() {

  });
  // config
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'SearchRepoCtrl'
        })
        .when(':/org/:repo/issues', {
          templateUrl: 'template/listIssues.html',
          controller: 'GetListIssuesCtrl'
        })
        .when('/:org/:repo/issues/:number', {
          templateUrl: 'template/issues.html',
          controller: 'IssuesCtrl'
        })
        .otherwise({
          temlpate: '<h1> NO page here<h1>'
        });
    }
  ]);
  // get issues
  app.service('parseUrl', function($location) {
    var pathUrl = $location.$$path;
    var regExp = /\/(\w+)\/(\w+)/;
    var loc = pathUrl.match(regExp);
    if (loc !== null) {
      var org = loc[1];
      var repo = loc[2];
      return {
        org: org,
        repo: repo
      };
    }

  });
  app.factory('getListIssues', function($http, parseUrl) {
    var url = 'https://api.github.com/repos/' + parseUrl.org + '/' + parseUrl.repo + '/issues';
    return {
      query: function() {
        return $http.get(url).then(function(res) {
          var list = angular.copy(res.data);
          // saveStorage();
          return list;
        });
      }
    };
  });
})();
