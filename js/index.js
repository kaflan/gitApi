/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', []);
  app.controller('IssuesCtrl', function($scope, listIssues) {
    $scope.data = [];
    listIssues.getBug().success(function(data) {
      $scope.data = angular.copy(data);
    }).error(function() {
      console.log('err');
    });
  });
  //directive
  app.directive('issues', function() {
    return {
      restrict: 'AEC',
      scope: {
        items: '=',
        id: '@'
      },
      replace: true,
      templateURl: '../template/ussues.html'
    };
  });
  app.directive('comments', function() {
    return {
      restrict: 'AEC',
      scope: {
        items: '=',
        id: '@'
      },
      replace: true,
      templateURl: '../template/comments.html'
    };
  });
  // get issues
  app.service('listIssues', function($http, $location) {
    return {
      getBug: function() {
        var regExp = /#\/(\w+)\/(\w+)/;
        var loc = location.hash.match(regExp);
        var url = $location.path();
        console.log(loc);
        console.log(url);
        return $http.get('https://api.github.com/repos' + url + '/issues');
      }
    };
  });
})();
//  https://api.github.com/repos/Codeception/Codeception/issues
