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
  // app.config(['$routeProvider', '$locationProvider',
  //   function($routeProvide) {
  //     $routeProvide.when('/', {
  //       templateURl: 'temlate/issues.html'
  //     });
  //   }
  // ]);

  //directive
  app.directive('issues', function() {
    return {
      restrict: 'AE',
      replace: true,
      link: function(){
        console.log('linked');
      },
      templateURl: 'template/issues.html',
      controller: function($scope){
        console.log($scope);
      }
    };
  });
  app.directive('comments', function() {
    return {
      restrict: 'AE',
      link: function(){
        console.log('linked');
      },
      replace: true,
      templateURl: 'template/comments.html'
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
