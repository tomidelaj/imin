'use strict';

angular.module('iminApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Features',
        'link' : '/pages/features'
      },
      {
        'title': 'Start',
        'link' : '/create'
      }
    ];

    $scope.isCollapsed = true;
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
  });
