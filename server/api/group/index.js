'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);

router.get('/:id', controller.show);
router.get('/:id/events', controller.events);
router.get('/:id/events/pending', controller.pending);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.param('id', controller.groupById);

module.exports = router;
