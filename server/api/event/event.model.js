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

EventSchema.statics.findByGroupId = function (groupId, cb){
  return this.find({group: new mongoose.Types.ObjectId(groupId) }, cb);
};

module.exports = mongoose.model('Event', EventSchema);
