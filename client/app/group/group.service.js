'use strict';

angular.module('iminApp').factory('Groups', function ($resource) {

  return $resource('api/groups/:groupId', {
    groupId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
