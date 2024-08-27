const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.get('/product', productController.getAllProduct);
// router.get('/product/:id', productController.getProductById);
// router.post('/product', productController.createProduct);
// router.put('/product/:id', productController.createProduct);
// router.delete('/product/:id', productController.createProduct);

module.exports = router;