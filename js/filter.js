(function() {
  'use strict';
  angular.module('gitApiFilter', ['hc.marked'])
    .filter('htmlParser', function(marked, $sce) {
      return function(text) {
        if (typeof(text) == 'string') {
          var message = (marked(text));
          return $sce.trustAsHtml(message);
        }
        return text;
      };
    });
})();
