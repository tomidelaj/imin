'use strict';

var express = require('express');
var controller = require('./group.controller');
var auth = require('../../auth/auth.service');
var gs = require('./group.service');

var router = express.Router();

router.get('/', controller.list);
router.post('/', auth.isAuthenticated(), controller.create);

router.get('/:id', controller.show);
router.get('/:id/events', controller.events);
router.get('/:id/events/pending', controller.pending);

router.put('/:id',gs.isOwner(), controller.update);
router.patch('/:id',gs.isOwner(), controller.update);
router.delete('/:id',gs.isOwner(), controller.destroy);

router.use('/:id/members', require('./member'));

router.param('id', controller.groupById);

module.exports = router;
