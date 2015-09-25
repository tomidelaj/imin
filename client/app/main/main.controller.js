'use strict';

angular.module('iminApp')
  .controller('MainCtrl', function ($scope, $mdDialog, Groups) {

    $scope.createGroupDialog = function() {
      $mdDialog.show({
        templateUrl: 'app/group/views/group-create-modal.html',
        controller: 'GroupCreateCtrl'
      });
    };

    $scope.find = function () {
      $scope.groups = Groups.query();
    };
  });
