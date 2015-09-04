;
(function() {
  'use strict';
  // directive  show  1 issue
  angular.module('gitDerective', ['gitApiCtrl'])
    .directive('issues', function() {
      return {
        controller: 'ListIessuesCtrl',
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
    })
    .directive('search', function() {
      return {
        controller: 'SearchRepoCtrl',
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'template/search.html'
      };
    })
    .directive('pages', function() {
      // Runs during compile
      return {
        controller: 'PageCtrl',
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'template/pages.html'
      };
    });
})();
