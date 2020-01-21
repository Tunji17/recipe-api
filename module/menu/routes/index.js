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
  validate(policy.readOne),
  catchErrors(controller.readOne),
);

router.put(
  validate(policy.update),
  catchErrors(controller.update),
);

router.delete(
  '/:companyId/:projectId',
  catchErrors(controller.remove),
);


module.exports = router;