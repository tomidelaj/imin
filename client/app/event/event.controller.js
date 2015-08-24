'use strict';

angular.module('iminApp')
  .controller('EventCtrl', function($scope, $stateParams, socket, Events, EventMessageFactory, EventParticipantFactory) {

    // Events
    if (!$scope.event) {
      $scope.event = Events.get({
        eventId: $stateParams.eventId
      });
    }

    // Event messages

    var EventMessage = new EventMessageFactory($scope.event._id);
    var EventParticipant = new EventParticipantFactory($scope.event._id);

    $scope.messages = EventMessage.query();
    $scope.participants = EventParticipant.query();

    // TODO: this is BUG; updates for all updated messages and participants
    socket.syncUpdates('message', $scope.messages);
    socket.syncUpdates('participant', $scope.participants);

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

    $scope.addParticipant = function() {
      var newParticipant = new EventParticipant({
        event: $scope.event._id,
        name: $scope.participantName
      });

      newParticipant.$save();
      $scope.participantName = '';
    };

    $scope.removeParticipant = function(participant) {
      new EventParticipant(participant).$remove();
    };

  });
