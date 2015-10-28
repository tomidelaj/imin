'use strict';

var express = require('express');
var controller = require('./participant.controller');
var gs = require('../../group/group.service');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

router.param('id', controller.participantById)

module.exports = router;
