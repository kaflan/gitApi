(function() {
  'use strict';
  angular.module('gitApiFilter', ['hc.marked'])
    .filter('htmlParser', function() {
      return function(text) {
        console.log(text);
      };
    });
})();
