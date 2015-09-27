'use strict';

angular.module('iminApp')
  .config(function ($stateProvider) {
    $stateProvider

      // Group routing
      .state('group', {
        url: '/group/:groupId',
        abstract: true,
        templateUrl: 'app/group/view/group.html',
        controller: 'GroupCtrl'
      })
      .state('group.upcoming', {
        url: '',
        templateUrl: 'app/group/view/state-upcoming-event.html',
      })
      .state('group.active', {
        url: '/active',
        templateUrl: 'app/group/view/state-active-events.html',
      })
      .state('group.history', {
        url: '/history',
        templateUrl: 'app/group/view/state-history-events.html',
      })
      .state('group.event', {
        url: '/event/:eventId',
        templateUrl: 'app/group/view/state-selected-event.html',
      })


      .state('groups', {
        url: '/groups',
        templateUrl: 'app/group/list/groups.html',
        controller: 'GroupListCtrl'
      })

      .state('slug', {
        url: '^/g/:slug',
        controller: function($state, $stateParams, Groups){
          Groups.query({
            slug: $stateParams.slug
          }).$promise.then(function(g){
            $state.go('group.upcoming', {groupId:g[0]._id});
          });
        }
      });
  });
