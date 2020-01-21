const express = require('express');
const controller = require('../controller');
const policy = require('../policy');
const { catchErrors, validate } = require('../../../helpers');

const router = express.Router();


router.get(
  '/',
  catchErrors(controller.read),
);

router.get(
  '/:categoryId',
  validate(policy.readOne),
  catchErrors(controller.readOne),
);


router.delete(
  '/:categoryId',
  validate(policy.remove),
  catchErrors(controller.remove),
);


module.exports = router;