const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.get('/product', productController.getAllProduct);

module.express = router;