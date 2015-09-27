'use strict';

angular.module('iminApp')
  .controller('CreateCtrl', function ($scope, $state, Groups) {

    $scope.model = {};
    
    $scope.createGroup = function () {
      var group = new Groups({
        slug: $scope.model.name
      });

      group.$save(function (response) {
        $state.go('group.upcoming', {groupId:response._id});
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
});
