/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', [/*'ngRoute' */]);
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
        var regExp = /#\/(\w+)\/(\w+)/;
        var loc = location.hash.match(regExp);
        var org = loc[1];
        var repo = loc[2];
        console.log(org);
        console.log(repo);
        // var url = $location.path();
        // ??? org =
        // repo =
        if (org === ' ' || repo === ' ') {
          console.log('err');
        }
        return $http.get('https://api.github.com/repos/' + org + '/' + repo + '/issues');
      }
    };
  });
})();
