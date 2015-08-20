'use strict';

angular.module('iminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewEvent', {
        url: '/event/:eventId',
        templateUrl: 'app/event/views/view-event.html',
        controller: 'EventCtrl'
      })
      .state('event', {
        url: '/event',
        templateUrl: 'app/event/view/event.html',
        controller: 'EventCtrl'
      });
  });
