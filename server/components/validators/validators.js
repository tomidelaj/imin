
'use strict';

exports.validateSlug = function(value) {
  // Slug must be between 3 and 20 chars long and
  // must be url friendly
  return /^[a-z0-9-]{3,20}$/i.test(value);
}

exports.validateMessage = function(value) {
  // Message must not be longer than 140 chars
  return value.length <= 140;
}

exports.validateMessageSender = function(value) {
  // Message sender must not be longer than 20 chars
  return value.length <= 20;
}
