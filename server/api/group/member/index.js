'use strict';

var express = require('express');
var controller = require('./member.controller');
var auth = require('../../../auth/auth.service');
var gs = require('../group.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/',gs.isOwner(), controller.add);
router.delete('/',gs.isOwner(), controller.remove);

router.post('/join', auth.isAuthenticated(), controller.join);
router.post('/leave', gs.isMember(), controller.leave);

module.exports = router;
