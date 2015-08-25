'use strict';

angular.module('iminApp')
  .controller('ParticipantsCtrl', function($scope, socket, EventParticipantFactory) {
    var init = function() {
      var EventParticipant = new EventParticipantFactory($scope.event._id);
      $scope.participants = EventParticipant.query();
      socket.syncUpdates('participant', $scope.participants);

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
    };

    if ($scope.event) {
      init();
    } else {
      $scope.$watch('event', function() {
        init();
      });
    }
  });
