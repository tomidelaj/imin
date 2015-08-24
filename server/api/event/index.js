'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get ('/:id/messages', controller.messagesIndex);
router.post('/:id/messages', controller.messageCreate);

router.get ('/:id/participants', controller.participantsList);
router.post('/:id/participants', controller.participantsCreate);
router.delete('/:id/participants/:participantId', controller.participantsDelete);

module.exports = router;
