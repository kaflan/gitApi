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
          // ,
          // link: function(scope, element, attr) {
          //   console.log(Object.keys(scope));
          //   // console.log(scope);

        //   // scope = $sce.trustAsHtml(markdown.toHTML(scope.issues));
        // }
      };
    })
    // directive show all comments
    .directive('comments', function() {
      return {
        // scope: {
        //   body: '='
        // },

        // replace: true,
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
      // Runs during compile
      return {
        controller: 'PageCtrl',
        restrict: 'E',
        templateUrl: 'template/pages.html'
      };
    });
})();
