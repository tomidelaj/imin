'use strict';

angular.module('iminApp')
  .controller('ParticipantsCtrl', function($scope, $cookies, socket, Auth, EventParticipantFactory) {

    var init = function() {

      $scope.EventParticipant = new EventParticipantFactory($scope.event._id);

      $scope.participants = $scope.EventParticipant.query();
      socket.syncUpdates('participant', $scope.participants);

      if (Auth.isLoggedIn())
      {
        $scope.participantName = Auth.getCurrentUser().name;
      }
      else {
        $scope.participantName = $cookies.get('participantName');
      }
    };

    var onDestroy = function() {
      socket.unsyncUpdates('message');
    };

    $scope.addParticipant = function() {
      var newParticipant = new $scope.EventParticipant({
        event: $scope.event._id,
        name: $scope.participantName
      });

      $cookies.put('participantName', $scope.participantName);

      newParticipant.$save(function() {
        $scope.event.stats.participants++;
      });
      $scope.participantName = '';
    };

    $scope.removeParticipant = function(participant) {
      new $scope.EventParticipant(participant).$remove(function() {
        $scope.event.stats.participants--;
      });
    };

    if ($scope.event.$promise) {
      $scope.event.$promise.then(function() {
        init();
      });
    } else {
      init();
    }

    $scope.$on('$destroy', onDestroy);
  });
