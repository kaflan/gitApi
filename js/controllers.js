;
(function() {
  'use strict';

  // list navigation controller
  angular.module('gitApiCtrl', ['gitFactory', 'hc.marked'])
    .controller('ListIessuesCtrl', function($scope, getListIssues, $routeParams) {
      $scope.org = $routeParams.org;
      $scope.repo = $routeParams.repo;
      $scope.issues;
      getListIssues.query($routeParams.org, $routeParams.repo)
        .then(function(data) {
          $scope.issues = angular.copy(data);
          if ($routeParams.number) {
            $scope.number = $routeParams.number;
            var issue = $scope.issues.filter(function(item) {
              return item.number == $scope.number;
            });
            if (!issue.length) return;
            $scope.issue = issue[0];
          }
        });
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

  // show comments controller
  .controller('CommentsCtrl', function(getListComments, $scope, $routeParams) {
    if ($routeParams.number !== undefined) {
      getListComments.query($routeParams.org, $routeParams.repo, $routeParams.number).then(function(data) {
        $scope.comments = angular.copy(data);
        // $scope.comments = $scope.comments['0'];
      });
    }
  })

  // pages controller
  .controller('PageCtrl', function(getListIssues, $scope, $routeParams) {
    $scope.issuesList = {};
    $scope.page = 1;
    $scope.previosPage = function() {
      if ($scope.page === 1) {
        return;
      }
      $scope.page--;
      // $scope.issuesList[$scope.page] = $scope.issues;
      $scope.issues = $scope.issuesList[$scope.page];
      console.log($scope.issuesList);
    };
    $scope.nextPage = function() {
      $scope.page++;
      console.log($scope.issuesList);
      getListIssues.queryPage($routeParams.org, $routeParams.repo, $scope.page).then(function(data) {
        $scope.issuesList[$scope.page] = angular.copy(data);
        $scope.issues = $scope.issuesList[$scope.page];
      });

    };
    // var url = 'https: //api.github.com/repos/' + org + '/' + repo + '/issues\?page\=' + number;

  });

})();
