const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
// const { validate } = require('../middlewares/validator');
// const orderValidation = require('../validations/order-validation');

router.post('/payment', paymentController.createOrder);
router.post('/payment/:id/struct/', paymentController.exportStruct);

module.exports = router;