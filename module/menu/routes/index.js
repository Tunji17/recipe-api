const express = require('express');
const controller = require('../controller');
const policy = require('../policy');
const { catchErrors, validate } = require('../../../helpers');

const router = express.Router();

router.post(
  '/',
  validate(policy.create),
  catchErrors(controller.create),
);

router.get(
  '/',
  catchErrors(controller.read),
);

router.get(
  '/:menuId',
  validate(policy.readOne),
  catchErrors(controller.readOne),
);

router.put(
  '/:menuId',
  validate(policy.update),
  catchErrors(controller.update),
);

router.delete(
  '/:menuId',
  validate(policy.remove),
  catchErrors(controller.remove),
);


module.exports = router;