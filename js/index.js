/* angular Global*/
(function() {
  'use strict';
  var app = angular.module('gitApi', []);
  app.controller('IssuesCtrl', function($scope, listIssues) {
    $scope.data = [];
    listIssues.getBug().success(function(data) {
      $scope.data =  angular.copy(data);
    });

  });
  //app.directive('myList', function() {});

  // get issues
  app.service('listIssues', function($http) {
    return {
      getBug: function() {
        return $http.get('https://api.github.com/repos/Codeception/Codeception/issues');
      }
    };
  });

})();
//  https://api.github.com/repos/Codeception/Codeception/issues
