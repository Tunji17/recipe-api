const express = require('express');

const { sendJSONResponse } = require('../helpers');
const menuRoutes = require('../module/menu/routes');
const categoryRoutes = require('../module/category/routes');


const router = express.Router();


router.get('/', (req, res) => sendJSONResponse(res, 200, null, req.method, 'Api is live!'));

router.use('/menu', menuRoutes);
router.use('/category', categoryRoutes);


module.exports = router;
