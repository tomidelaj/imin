'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  slug: String,
  info: String,
  active: Boolean
});

GroupSchema.path('slug').validate(function(value) {
  // Slug must not be longer than 20 chars and
  // must be url friendly
  if (value.length <= 20) {
    return /^[a-z0-9-]+$/i.test(value);
  }
  else {
    return false;
  }
}, 'Incorrect slug');

module.exports = mongoose.model('Group', GroupSchema);
