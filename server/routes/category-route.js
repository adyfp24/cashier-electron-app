const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');
// const { validate } = require('../middlewares/validator');
// const productValidation = require('../validations/product-validation');

router.get('/category', categoryController.getAllCategory);
router.post('/category', categoryController.createCategory);

module.exports = router;