'use strict';

angular.module('iminApp')
  .directive('scrollClass', function($window) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        angular.element($window).bind('scroll', function() {
          if (this.pageYOffset > 100) {
            element.addClass(attrs.scrollClass);
          } else {
            element.removeClass(attrs.scrollClass);
          }
          $scope.$apply();
        });
      }
    };
  });
