const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/LoginRegisterSms/loginController');

router.post('/new', loginController.handleLoginSMS);
router.post('/verify', loginController.verifyLoginSMS);

module.exports = router;