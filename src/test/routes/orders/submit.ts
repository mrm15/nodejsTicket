const express = require('express');
const orders = require("../../controllers/orders/submit");
const router = express.Router();


//new product
router.post('/new', orders.submitNewOrder);
// router.get('/', orders.submitNewOrder);
module.exports = router
