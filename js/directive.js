;
(function() {
  'use strict';
  // directive  show  1 issue
  angular.module('gitDerective', ['gitApiCtrl'])
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
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        controller: 'PageCtrl',
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'templatte/pages.html'
          // replace: true,
          // transclude: true,
          // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      };
    });
})();
