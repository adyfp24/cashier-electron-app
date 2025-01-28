const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const multer = require('../middlewares/multer');
const pagination = require('../middlewares/pagination');
// const { validate } = require('../middlewares/validator');
// const productValidation = require('../validations/product-validation');

router.get('/product', pagination, productController.getAllProduct);
router.get('/product/:id', productController.getProductById);
router.post('/product', multer.single('gambar'), productController.createProduct);
router.delete('/product/:id', productController.deleteProduct);
router.put('/product/:id', multer.single('gambar'), productController.updateProduct);

module.exports = router;