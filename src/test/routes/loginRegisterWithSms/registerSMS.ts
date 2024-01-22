const handleNewUserSMS = require("../../controllers/LoginRegisterSms/registerViaSmsController");
const express = require("express");
const router = express.Router();
router.post('/new', handleNewUserSMS.handleNewUserSMS);
router.post('/verify', handleNewUserSMS.handleVerifySMS);

module.exports = router;
