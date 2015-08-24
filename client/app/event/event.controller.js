'use strict';

angular.module('iminApp')
  .controller('EventCtrl', function($scope, $stateParams, socket, Events, EventMessageFactory) {

    // Events
    $scope.event = Events.get({
      eventId: $stateParams.eventId
    });

    // Event messages

    var EventMessage = new EventMessageFactory($stateParams.eventId);

    $scope.messages = EventMessage.query();
    socket.syncUpdates('message', $scope.messages);

    $scope.newMessage = {};
    
    $scope.sendMessage = function(message) {

      var newMessage = new EventMessage({
        event: $stateParams.eventId,
        sender: message.sender,
        message: message.message,
        date: new Date().toISOString() // TODO move date to server side
      });

      newMessage.$save();

      $scope.newMessage = {};
    };

  });
