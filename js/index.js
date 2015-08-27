/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);

  // navigation controller
  app.controller('NavigateCtrl', function($scope, getListIssues, $routeParams) {
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.issues = angular.copy(data);
    });
    $scope.issuesItem = function() {
      $scope.number = $routeParams.number;
      $scope.org = $routeParams.org;
      $scope.repo = $routeParams.repo;
      var issue = $scope.issues.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    };
  });

  // repo and org controller search
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

  //show comments controller
  app.controller('CommentsCtrl', function(getListComments, $scope, $routeParams) {
    if ($routeParams.number !== undefined) {
      getListComments.query($routeParams.org, $routeParams.repo, $routeParams.number).then(function(data) {
        $scope.comments = angular.copy(data);
        console.log('if work 1', $scope.issues);
        var issue = $scope.issues.filter(function(item) {
          return item.number == $routeParams.number;
        });
        // console.log('if work', $scope);

        if (!issue.length) return;
        $scope.issue = issue[0];
        console.log('if work', $scope.issue);
      });
      console.log('if work 2', $scope.issues);

    }
  });
  // directive  show  1 issue
  app.directive('issues', function() {
    return {
      controller: 'NavigateCtrl',
      restrict: 'E',
      templateUrl: 'template/showIssues.html'
    };
  });
  // directive show all comments
  app.directive('comments', function() {
    return {
      controller: 'CommentsCtrl',
      restrict: 'E',
      templateUrl: 'template/comments.html'
    };
  });

  // config
  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'SearchRepoCtrl'
        })
        .when('/:org/:repo/issues/', {
          // controller: 'NavigateCtrl',
          templateUrl: 'template/nav.html'
        })
        .when('/:org/:repo/issues/:number', {
          // controller: 'CommentsCtrl',
          templateUrl: 'template/nav.html'
        })
        .otherwise({
          temlpate: '<h1> NO page here<h1>'
        });
    }
  ]);
  // factory get issues list from git hub
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
  // factory get comments list from git hub
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
