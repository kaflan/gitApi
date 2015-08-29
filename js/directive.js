;
(function() {
  'use strict';
  // directive  show  1 issue
  angular.module('gitDerective', [])
    .directive('issues', function() {
      return {
        controller: 'NavigateCtrl',
        restrict: 'E',
        templateUrl: 'template/showIssues.html'
      };
    })
    // directive show all comments
    .directive('comments', function() {
      return {
        controller: 'CommentsCtrl',
        restrict: 'E',
        templateUrl: 'template/comments.html'
      };
    });
})();
