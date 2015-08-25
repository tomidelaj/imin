'use strict';

angular.module('iminApp')
  .controller('EventCtrl', function($scope, $stateParams, Events) {

    $scope.initEvent = function() {
      // Two ways of using this controller
      // a) event is passed from parent scope (ng-include)
      // b) event must be retrieved using state params
      if (!$scope.event) {
        Events.get({
          eventId: $stateParams.eventId
        }).$promise.then(function (event){
          $scope.event = event;
        });
      }
    };
  });
