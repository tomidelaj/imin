'use strict';

var _ = require('lodash');
var Member = require('./member.model');

// Get list of members
exports.index = function(req, res) {
  Member.findByGroupId(req.group._id, function (err, members) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(members);
  });
};

exports.add = function(req, res) {
  var member = new Member();
  member.group = req.group._id;
  member.user = req.body.user_id;

  member.save(function (err){
    if (err) { return handleError(res, err); }
    return res.status(201).json(member);
  });
};

exports.remove = function(req, res) {
  Member.findByGroupAndUserId(req.group._id, req.body.user_id, function (err, member) {
    if(err) { return handleError(res, err); }
    if(!member) { return res.status(404).send('Not Found'); }
    member.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
