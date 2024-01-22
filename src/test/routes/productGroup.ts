const express = require('express');
const router = express.Router();
const ProductGroup = require('../models/productGroup')
const productGroupController = require('../controllers/productController/productGroupController')


//new product
router.post('/new', productGroupController.registerNewCategory);
router.get('/', productGroupController.getProductCategoryList
);
module.exports = router
