'use strict';

var mongoose = require('mongoose');
var compose = require('composable-middleware');
var Group = require('./group.model');
var Member = require('./member/member.model');
var auth = require('../../auth/auth.service');

/**
 * Checks if group owner
 */
function isOwner() {
  return compose()
    .use(auth.isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (req.group.owner === req.user._id) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

function isMember() {
  return compose()
    .use(auth.isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      Member.findOne({ user: req.user._id, group: req.group._id }, function(err, member) {
        if (member) {
          next();
        } else {
          res.status(403).send('Forbidden');
        }
      });
    });
}

exports.isOwner = isOwner;
exports.isMember = isMember;
