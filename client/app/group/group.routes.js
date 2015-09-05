'use strict';

angular.module('iminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/group/:groupId',
        abstract: true,
        redirectTo: 'group.pending',
        templateUrl: 'app/group/views/group.html',
        controller: 'GroupCtrl'
      })

      .state('group.upcoming', {
        url: '',
        templateUrl: 'app/group/views/group-upcoming.html',
      })
      .state('group.active', {
        url: '/active',
        templateUrl: 'app/group/views/group-active.html',
      })
      .state('group.history', {
        url: '/history',
        templateUrl: 'app/group/views/group-history.html',
      })
      .state('group.event', {
        url: '/event/:eventId',
        templateUrl: 'app/group/views/group-event.html',
      })
      .state('groups', {
        url: '/group',
        templateUrl: 'app/group/views/groups.html',
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
