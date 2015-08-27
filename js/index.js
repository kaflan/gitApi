/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);
  app.controller('NavigateCtrl', function($scope, getListIssues, $routeParams) {
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.data = angular.copy(data);
    });
    $scope.issuesItem = function() {
      $scope.number = $routeParams.number;
      $scope.org = $routeParams.org;
      $scope.repo = $routeParams.repo;
      var issue = $scope.data.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    };
  });

  // repo and org controller
  app.controller('SearchRepoCtrl', function($scope, $location, getListIssues) {
    if ($location.$$path === '') {
      $scope.startPage = true;
    }
    $scope.searchRepo = function() {
      getListIssues.query($scope.org, $scope.repo).then(function(data) {
        $scope.data = angular.copy(data);
      });
      $scope.startPage = false;
      $location.path('/' + $scope.org + '/' + $scope.repo + '/issues');
    };
  });
  app.controller('CommentsCtrl', function(getListComments, $scope, $routeParams, getListIssues) {
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.data = angular.copy(data);
      var issue = $scope.data.filter(function(item) {
        return item.number == $routeParams.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    });
    if ($routeParams.number !== undefined) {
      getListComments.query($routeParams.org, $routeParams.repo, $routeParams.number).then(function(data) {
        $scope.comments = angular.copy(data);
      });
    }
  });



  app.directive('issues', function() {
    return {
      controller: 'NavigateCtrl',
      restrict: 'E',
      templateUrl: 'template/showIssues.html'
    };
  });
  app.directive('comments', function() {
    return {
      controller: 'CommentsCtrl',
      restrict: 'E',
      templateUrl: 'template/comments.html'
    };
  });

  // comments ctrl

  // config
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'SearchRepoCtrl'
        })
        .when('/:org/:repo/issues/', {
          controller: 'NavigateCtrl',
          templateUrl: 'template/nav.html'
        })
        .when('/:org/:repo/issues/:number', {
          controller: 'CommentsCtrl',
          templateUrl: 'template/nav.html'
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
          return list;
        });
      }
    };
  });

  app.factory('getListComments', function($http) {
    return {
      query: function(org, repo, number) {
        var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues' + '/' + number + '/' + 'comments';
        return $http.get(url).then(function(res) {
          var list = angular.copy(res.data);
          return list;
        });
      }
    };
  });
})();
