const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController/procuctController");
router.get('/', productController.getProductList);
router.post('/', productController.addNewProduct)
module.exports = router
