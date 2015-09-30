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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Validation
GroupSchema.path('slug').validate(validators.validateSlug,
  'Slug validation failed');

module.exports = mongoose.model('Group', GroupSchema);
