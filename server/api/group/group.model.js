'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('../validators');

var GroupSchema = new Schema({
  name: String,
  slug: String,
  info: String,
  active: Boolean
});

GroupSchema.path('slug').validate(validators.validateSlug, 'Incorrect slug');

module.exports = mongoose.model('Group', GroupSchema);
