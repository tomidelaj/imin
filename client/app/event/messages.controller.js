'use strict';

angular.module('iminApp')
  .controller('MessagesCtrl', function($scope, socket, EventMessageFactory) {

    var init = function() {
      var EventMessage = new EventMessageFactory($scope.event._id);
      $scope.messages = EventMessage.query();
      socket.syncUpdates('message', $scope.messages);

      $scope.newMessage = {};
      $scope.sendMessage = function(message) {

        var newMessage = new EventMessage({
          event: $scope.event._id,
          sender: message.sender,
          message: message.message,
          date: new Date().toISOString() // TODO move date to server side
        });

        newMessage.$save();

        $scope.newMessage = {};
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
