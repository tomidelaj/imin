'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function ($scope, $location, $stateParams, Groups) {
    $scope.find = function () {
      $scope.groups = Groups.query();
    };


    $scope.remove = function (group) {

      group.$remove();

      for (var i in $scope.groups) {
        if ($scope.groups[i] === group) {
          $scope.group.splice(i, 1);
        }
      }
    };

    $scope.create = function () {
      var group = new Groups({
        slug: $scope.newGroup
      });

      group.$save(function (response) {
        $location.path('group/' + response.slug);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    $scope.findOne = function () {
      $scope.group = Groups.get({
        groupId: $stateParams.groupId
      });
    };

    $scope.findEvents = function () {
      $scope.events = Groups.events({
        groupId: $stateParams.groupId
      });
    };

    $scope.addUser = function (event, user) {
      event.users.push(user);
    }
  });
