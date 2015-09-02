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
    $scope.searchRepo = function() {
      getListIssues.query($scope.org, $scope.repo).then(function(data) {
        $scope.issues = angular.copy(data);
      });
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
        if (!issue.length) return;
        $scope.issue = issue[0];
      });
    }
  })

  //pages controller
  .controller('PageCtrl', function(getNextPage, $scope, $routeParams) {
    $scope.issuesList = {};
    $scope.page = 1;
    $scope.previosPage = function() {
      if ($scope.page === 1) {
        return;
      }
      $scope.page = $scope.page - 1;

      $scope.issuesList[$scope.page];
      console.log($scope.issuesList);
    };
    $scope.nextPage = function() {
      $scope.page = $scope.page + 1;
      $scope.issuesList[$scope.page];
      console.log($scope.issuesList);
      // getNextPage.query($routeParams.org, $routeParams.repo, $scope.page).then(function(data) {
      //   $scope.issuesList[$scope.page] = angular.copy(data);
      //   console.log($scope.issuesList);
      // });

    };
    // var url = 'https: //api.github.com/repos/' + org + '/' + repo + '/issues\?page\=' + number;

  });
})();
