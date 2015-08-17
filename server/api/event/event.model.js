'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  date: Date,
  users: [String],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
});

module.exports = mongoose.model('Event', EventSchema);
