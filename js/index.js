/* angular Global*/
(function() {
  'use strict';
  var list = null;
  var regExp = /#\/(\w+)\/(\w+)/;
  var loc = location.hash.match(regExp);
  var org = loc[1];
  var repo = loc[2];
  var regExp2 = /([0-9]+)/;
  var loc2 = location.hash.match(regExp2);
  var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues';
  var app = angular.module('gitApi', ['ngRoute', 'ngResource']);
  var number;
  //costile 
  if (loc2 !== null) {
    number = loc2[1];
  }

  function saveStorage() {
    localStorage.setItem('list', JSON.stringify(list));
  }

  function loadStorage() {
    list = JSON.parse(localStorage.getItem('list'));
  }
  app.controller('ListIssuesCtrl', function($scope, listIssues, $routeParams) {
    $scope.org = $routeParams.org;
    $scope.repo = $routeParams.repo;
    console.log($routeParams.org, $routeParams.repo);
    $scope.data;
    //load storage
    if (list !== null) {
      loadStorage();
      $scope.data = list;
    }
    listIssues.getBug().success(function(data) {
      $scope.data = angular.copy(data);
      list = $scope.data;
      saveStorage();
      return false;
    }).error(function() {
      document.write('err');
      return false;
    });
  });
// Issuess  ctrl
  app.controller('IssuesCtrl', function($scope,$location,changeUrl) {
    console.log(changeUrl);
    console.log($location.url());
  });
// comments ctrl
  app.controller('CommentsCtrl', function() {

  });

  app.config(['$routeProvider',
    function($routeProvider) {
      console.log($routeProvider);
      $routeProvider
        .when('/:org/:repo', {
          controller: 'ListIssuesCtrl'
        })
        .when('/issues', {
          templateUrl: 'template/issues.html',
          controller: 'IssuesCtrl'
        })
        .otherwise({
          redirectTo: '/'
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
  app.service('listIssues', function($http) {
    return {
      getBug: function() {
        if (org === ' ' || repo === ' ') {
          document.write('Error adres');
          return false;
        }
        return $http.get(url);
      }
    };
  });
  app.factory('changeUrl', ['$resource',
    function($resource) {
      return $resource('/:org/:repo/issues/:number', {
        org: org,
        repo: repo,
        number : number
      });
    }
  ]);
})();