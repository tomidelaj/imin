'use strict';

angular.module('iminApp').factory('Messages', function($resource) {

  return $resource('api/messages/:messageId', {
    eventId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
