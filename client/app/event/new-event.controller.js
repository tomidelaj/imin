'use strict';

angular.module('iminApp')
  .controller('NewEventCtrl', function($scope, ngDialog, Events) {
    $scope.createEvent = function() {

      var newEvent = new Events({
        group: $scope.ngDialogData.groupId,
        name: $scope.eventName,
        date: $scope.datetime,
        repeatable: {
          isRepeatable: $scope.isRepeatable
        }
      });

      newEvent.$save().then(function() {
        $scope.closeThisDialog({
          eventCreated: true
        });
      });
    };
  });
