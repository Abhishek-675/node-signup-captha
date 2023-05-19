const {Router} = require('express');

const adminController = require('../controller/admin');
const jwtAuthenticate = require('../middleware/jwtAuth');
const passportConfig = require('../middleware/passportConfig');
const capthaMiddleware = require("../middleware/captha");

const adminRoutes = Router();

adminRoutes.post('/signup', capthaMiddleware.capthaValidation, adminController.signup)

adminRoutes.post('/login', 
passportConfig.authenticate('local'),
 adminController.login2)
adminRoutes.post('/token', adminController.token)
adminRoutes.post('/logout', adminController.deleteToken);

adminRoutes.get("/users", jwtAuthenticate.authenticate, adminController.users);

module.exports = adminRoutes;