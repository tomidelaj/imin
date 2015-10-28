'use strict';

angular.module('iminApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('auth', {
        abstract:true,
        templateUrl: 'app/account/auth/auth.html',
      })
      .state('auth.login', {
        url: '^/login?target',
        templateUrl: 'app/account/auth/login/state-login-social.html',
        controller: 'AuthCtrl'
      })
      .state('auth.login-custom', {
        url: '^/login/custom?target',
        templateUrl: 'app/account/auth/login/state-login-custom.html',
        controller: 'AuthCtrl'
      })
      .state('auth.signup', {
        url: '^/signup?target',
        templateUrl: 'app/account/auth/signup/state-signup-social.html',
        controller: 'AuthCtrl'
      })
      .state('auth.signup-custom', {
        url: '^/signup/custom?target',
        templateUrl: 'app/account/auth/signup/state-signup-custom.html',
        controller: 'AuthCtrl'
      });
    $urlRouterProvider.when('/auth', '/login');
  });
