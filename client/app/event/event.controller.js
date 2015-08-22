'use strict';

angular.module('iminApp')
  .controller('EventCtrl', function($scope, $stateParams, Events) {

    $scope.event = Events.get({
      eventId: $stateParams.eventId
    });

    $scope.messages = Events.messages({
      eventId: $stateParams.eventId
    });

  });
