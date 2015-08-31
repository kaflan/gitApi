;
(function() {
  'use strict';
  // navigation controller
  angular.module('gitApiCtrl', ['gitFactory'])
    .controller('NavigateCtrl', function($scope, getListIssues, $routeParams) {
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
    })

  // repo and org controller search
  .controller('SearchRepoCtrl', function($scope, $location, getListIssues) {
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
  })

  //show comments controller
  .controller('CommentsCtrl', function(getListComments, $scope, $routeParams) {
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
})();
