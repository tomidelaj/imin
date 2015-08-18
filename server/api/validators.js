
'use strict';

exports.validateSlug = function(value) {
  // Slug must not be longer than 20 chars and
  // must be url friendly
  if (value.length <= 20) {
    return /^[a-z0-9-]+$/i.test(value);
  }
  else {
    return false;
  }
}

exports.validateMessage = function(value) {
  // Message must not be longer than 140 chars
  return value.length <= 140;
}

exports.validateMessageSender = function(value) {
  // Message sender must not be longer than 20 chars
  return value.length <= 20;
}
