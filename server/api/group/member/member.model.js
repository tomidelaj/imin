'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }
});

MemberSchema.statics.findByGroupId = function(groupId, cb) {
  return this.find({
    group: new mongoose.Types.ObjectId(groupId)
  }, cb);
};

MemberSchema.statics.findByUserId = function(userId, cb) {
  return this.find({
    user: new mongoose.Types.ObjectId(userId)
  }, cb);
};

MemberSchema.statics.findByGroupAndUserId = function(groupId, userId, cb) {
  return this.findOne({
    user: new mongoose.Types.ObjectId(userId),
    group: new mongoose.Types.ObjectId(groupId)
  }, cb);
};

module.exports = mongoose.model('Member', MemberSchema);
