'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
});

EventSchema.statics.findByGroupId = function(groupId, cb) {
  return this.find({
    group: new mongoose.Types.ObjectId(groupId)
  }, cb);
};

module.exports = mongoose.model('Event', EventSchema);
