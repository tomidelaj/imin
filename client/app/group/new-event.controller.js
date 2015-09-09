'use strict';

angular.module('iminApp')
  .controller('NewEventCtrl', function($scope, ngDialog, Events) {
    $scope.createEvent = function() {

      var newEvent = new Events({
        group: $scope.ngDialogData.groupId,
        name: $scope.eventName,
        // TODO let the use select datetime
        date: new Date()
      });

      newEvent.$save().then(function() {
        $scope.closeThisDialog({
          eventCreated: true
        });
      });
    };
  });
