'use strict';

var express = require('express');
var controller = require('./group.controller');

var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.show);
router.get('/:id/events', controller.events);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.param('id', controller.groupById);

module.exports = router;
