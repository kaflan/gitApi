/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);

  app.controller('GetIssuesCtrl', function($scope, getListIssues, $routeParams) {
    $scope.startPage = false;
    $scope.org = $routeParams.org;
    $scope.repo = $routeParams.repo;
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.data = angular.copy(data);
    });
  });

  app.controller('ShowIssuesCtrl', function($scope, getListIssues, $routeParams) {
    $scope.number = $routeParams.number;
    $scope.org = $routeParams.org;
    $scope.repo = $routeParams.repo;
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.any = data;
      var issue = $scope.any.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
      console.log($scope.issue);
    });
  });

  // repo and org controller
  app.controller('SearchRepoCtrl', function($scope, $location) {
    if ($location.$$hash == '') {
      $scope.startPage = true;
    }
    $scope.searchRepo = function() {
      $scope.startPage = false;
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
        .when('/:number', {
          controller: 'ShowIssuesCtrl',
          templateUrl: 'template/showIssues.html'
        })
        .when('/:org/:repo/issues', {
          templateUrl: 'template/listIssues.html',
          controller: 'GetIssuesCtrl'
        })
        .when('/:org/:repo/issues/:number', {
          templateUrl: 'template/showIssues.html',
          controller: 'ShowIssuesCtrl'
        })
        .otherwise({
          temlpate: '<h1> NO page here<h1>'
        });
    }
  ]);

  app.factory('getListIssues', function($http) {
    return {
      query: function(org, repo) {
        var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues';
        return $http.get(url).then(function(res) {
          var list = angular.copy(res.data);
          // saveStorage();
          return list;
        });
      }
    };
  });
})();
