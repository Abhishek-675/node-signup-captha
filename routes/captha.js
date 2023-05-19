const {Router} = require('express');

const capthaController = require('../middleware/captha');

const capthaRoutes = Router();

capthaRoutes.get('/captha-generate', capthaController.capthaGenerator)

module.exports = capthaRoutes;
