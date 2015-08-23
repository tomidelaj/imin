'use strict';

angular.module('iminApp')
  .directive('avatar', function() {
    let colorMapping = {};

    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: '='
      },
      templateUrl: 'components/avatar/avatar.html',
      link: function($scope) {

        function stringToColor(str) {

          var hash = 0;
          for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
          }
          var c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

          return '#'+'00000'.substring(0, 6 - c.length) + c;
        }

        var unwatch = $scope.$watch('user', function(user) {
          console.log('user', user);

          if (user) {
            var words = user.split(' ');

            $scope.initials = (words[0][0]);
            if (words.length > 1) {
              $scope.initials += (words[1][0]);
            }

            $scope.color = stringToColor(user);

            unwatch();
          }
        });
      }
    };

  });
