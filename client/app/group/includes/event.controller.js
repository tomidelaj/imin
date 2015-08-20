'use strict';

// TODO: This whole inlcudes thing needs some serious refactoring.

angular.module('iminApp')
  // TODO: change controller name
  .controller('IncludeEventCtrl', function ($scope, $location, $stateParams, Events) {
    $scope.events = Events.query();
  });
