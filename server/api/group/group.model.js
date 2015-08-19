'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('../../components/validators/validators');

var GroupSchema = new Schema({
  name: String,
  slug: String,
  description: String
});

GroupSchema.path('slug').validate(validators.validateSlug, 'Slug validation failed');

module.exports = mongoose.model('Group', GroupSchema);
