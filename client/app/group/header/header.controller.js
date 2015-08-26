'use strict';

angular.module('iminApp')
  .controller('HeaderCtrl', function($scope, $location, $state, Auth) {

    var init = function() {
      var baseUrl = '/group/' + $scope.group._id;
      $scope.menu = [{
        'title': 'Upcoming',
        'link': $state.href('group.upcoming', {groupId: $scope.group._id})
      }, {
        'title': 'Active',
        'link': $state.href('group.active', {groupId: $scope.group._id})
      }, {
        'title': 'History',
        'link': $state.href('group.history', {groupId: $scope.group._id})
      }];

      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.logout = function() {
        Auth.logout();
        $location.path('/login');
      };

      $scope.isActive = function(route) {
        return route === $location.path();
      };
    };

    if (!$scope.group.$promise) {
      init();
    } else {
      $scope.group.$promise.then(function() {
        init();
      });
    }


  });
