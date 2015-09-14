;
(function() {
  'use strict';
  // directive  show  1 issue
  angular.module('gitDerective', ['gitApiCtrl'])
    .directive('issues', function($sce) {
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
        restrict: 'E',
        templateUrl: 'template/search.html'
      };
    })
    .directive('pages', function() {
      return {
        controller: 'PageCtrl',
        restrict: 'E',
        templateUrl: 'template/pages.html'
      };
    })
    .directive('github', function() {
      return {
        controller: '',
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'template/github.html'
      };
    });
})();
