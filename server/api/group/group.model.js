'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validators = require('../../components/validators/validators');

var GroupSchema = new Schema({
  name: {
    type: String,
    default: "My new Group"
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// Validation
GroupSchema.path('slug').validate(validators.validateSlug,
  'Slug validation failed');

GroupSchema.statics.findBySlug = function(slug, cb) {
  return this.findOne({
    slug: slug
  }, cb);
};

module.exports = mongoose.model('Group', GroupSchema);
