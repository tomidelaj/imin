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

describe('Message validator', function() {
   it('should return true when message has less than 140 characters', function() {
       validator.validateMessage('Some message').should.equal(true);
   });

   it('should return true when message has 140 characters', function() {
       validator.validateMessage('tesOqvRsDftEjNpinYhAWiEi2YFJhS6uAWbjczzfKD40rdkSZWdX4OqMcGzfFKKo8sfTRosAFatOvETlNc2FmToTVXvYJMLLqWp0VmT74cjElExJjwjy5hArXbtUSFA8BrGXbD02u0rm').should.equal(true);
   });

   it('should return false when message longer than 140 characters', function() {
       validator.validateMessage('tesOqvRsDftEjNpinYhAWiEi2YFJhS6uAWbjczzfKD40rdkSZWdX4OqMcGzfFKKo8sfTRosAFatOvETlNc2FmToTVXvYJMLLqWp0VmT74cjElExJjwjy5hArXbtUSFA8BrGXbD02u0rmz').should.equal(false);
   });
})

describe('Message sender validator', function() {
   it('should return true when message has less than 20 characters', function() {
       validator.validateMessageSender('Sender').should.equal(true);
   });

   it('should return true when message has 20 characters', function() {
       validator.validateMessageSender('tesOqvRsDftEjNpinYhA').should.equal(true);
   });

   it('should return false when message longer than 20 characters', function() {
       validator.validateMessageSender('tesOqvRsDftEjNpinYhAW').should.equal(false);
   });
})
