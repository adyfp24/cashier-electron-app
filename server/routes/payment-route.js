const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
// const { validate } = require('../middlewares/validator');
// const orderValidation = require('../validations/order-validation');

router.post('/order', paymentController.createOrder);
router.post('/order/:id/struct/', paymentController.exportStruct);

module.exports = router;