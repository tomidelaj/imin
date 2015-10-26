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


MemberSchema.pre('save', function(next, done){
    var self = this;
    this.constructor.findOne({user: self.user, group: self.group}, function(err, user){
      if (err){
        done(err);
      } else if (user){
        next(new Error("User already member."));
      } else {
        next();
      }
    }
  )
  });

MemberSchema.statics.findByGroupId = function(groupId, cb) {
  return this.find({
    group: new mongoose.Types.ObjectId(groupId)})
  .populate('user', 'name')
  .exec(cb);
};

MemberSchema.statics.findByGroupAndUserId = function(groupId, userId, cb) {
  return this.findOne({
    user: new mongoose.Types.ObjectId(userId),
    group: new mongoose.Types.ObjectId(groupId)
  }, cb);
};

module.exports = mongoose.model('Member', MemberSchema);
