'use strict';

angular.module('iminApp')
  .controller('EventCtrl', function($scope, $stateParams, socket, Events) {

    var init = function() {
      console.log($scope.event);
      socket.join($scope.event._id);
    };

    var onDestroy = function () {
      socket.leave($scope.event._id);
    };

    $scope.initEvent = function() {
      // Two ways of using this controller
      // a) event is passed from parent scope (ng-include)
      // b) event must be retrieved using state params
      if (!$scope.event) {
        $scope.event = Events.get({
          eventId: $stateParams.eventId
        });
      }

      // !!! This is strange pattern -> TODO: promised based communication
      if ($scope.event.$promise)
      {
        $scope.event.$promise.then(function (){
            init();
          });
      }
      else {
        init();
      }

    };

    $scope.$on('$destroy', onDestroy);
  });
