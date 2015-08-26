/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);

  app.controller('NavigateCtrl', function($scope, getListIssues, $routeParams) {
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.data = angular.copy(data);
    });
    $scope.issues = function() {
      $scope.number = $routeParams.number;
      $scope.org = $routeParams.org;
      $scope.repo = $routeParams.repo;
      console.log($routeParams);
      var issue = $scope.data.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    };
  });
  app.controller('ShowIssuesCtrl', function($scope, getListIssues, $routeParams) {
    // $scope.startPage = true;
    $scope.number = $routeParams.number;
    $scope.org = $routeParams.org;
    $scope.repo = $routeParams.repo;
    getListIssues.query($routeParams.org, $routeParams.repo).then(function(data) {
      $scope.data = data;
      $scope.any = data;
      var issue = $scope.any.filter(function(item) {
        return item.number == $scope.number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    });
    // if ($routeParams.number !== undefined) {
    //   console.log($routeParams.number);
    //   getListComments.query($routeParams.org, $routeParams.repo, $routeParams.number).then(function(data) {
    //     $scope.data = angular.copy(data);
    //     console.log($scope.data);
    //     console.log($routeParams);
    //   });
    // }
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
  app.controller('CommentsCtrl', function(getListComments, $scope, $routeParams) {
    console.log($routeParams);
    if ($routeParams.number !== undefined) {
      console.log($routeParams.number);
      getListComments.query($routeParams.org, $routeParams.repo, $routeParams.number).then(function(data) {
        $scope.data = angular.copy(data);
        console.log('work');
        console.log($scope.data);
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
      // temp;
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
        .when('/:org/:repo/issues', {
          controller: 'NavigateCtrl',
          templateUrl: 'template/nav.html'
        })
        .when('/:org/:repo/issues/:number', {
          controller: 'ShowIssuesCtrl',
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
  // app.service('parseUrl', function($location) {
  //   var pathUrl = $location.$$path;
  //   var regExp = /\/(\w+)\/(\w+)/;
  //   var loc = pathUrl.match(regExp);
  //   if (loc !== null) {
  //     var org = loc[1];
  //     var repo = loc[2];
  //     return {
  //       org: org,
  //       repo: repo
  //     };
  //   }
  // });

})();
