'use strict';

angular.module('iminApp').factory('Groups', function($resource) {

  var baseUrl = 'api/groups/:groupId';

  return $resource(baseUrl,
    { groupId: '@_id' },
    {
      update: {
        method: 'PUT'
      },
      events:
      {
        url: baseUrl + '/events',
        method:'GET',
        isArray: true
      }
    }
  );
});
