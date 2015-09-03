'use strict';

angular.module('iminApp')
  .controller('ParticipantsCtrl', function($scope, $cookies, socket, EventParticipantFactory) {
    var init = function() {
      var EventParticipant = new EventParticipantFactory($scope.event._id);
      $scope.participants = EventParticipant.query();
      socket.syncUpdates('participant', $scope.participants);

      $scope.participantName = $cookies.get('participantName');

      $scope.addParticipant = function() {
        var newParticipant = new EventParticipant({
          event: $scope.event._id,
          name: $scope.participantName
        });

        $cookies.put('participantName', $scope.participantName);

        newParticipant.$save();
        $scope.participantName = '';
      };

      $scope.removeParticipant = function(participant) {
        new EventParticipant(participant).$remove();
      };
    };

    var onDestroy = function () {
      socket.unsyncUpdates('message');
    };

    if ($scope.event.$promise)
    {
      $scope.event.$promise.then(function (){
          init();
        });
    }
    else {
      init();
    }

    $scope.$on('$destroy', onDestroy);
  });
