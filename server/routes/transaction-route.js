const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction-controller');

router.get('/transaction', transactionController.getAllTransaction);
router.get('/transaction/:id', transactionController.getTransactionById);

module.exports = router;