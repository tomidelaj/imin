'use strict';

var validator = require('./validators');

describe('Slug validator', function() {
   it('should return true when letters used', function() {
       validator.validateSlug('fuzbal').should.equal(true);
   });

   it('should return true when letters and numbers used', function() {
       validator.validateSlug('fuzbal123').should.equal(true);
   });

   it('should return true when dash used', function() {
       validator.validateSlug('fuzbal-yea').should.equal(true);
   });

   it('should return false when spaces used', function() {
       validator.validateSlug('fuzbal no no').should.equal(false);
   });

   it('should return false when special characters used', function() {
       validator.validateSlug('fuzbal!').should.equal(false);
   });
})
