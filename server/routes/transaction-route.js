const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction-controller');
const pagination = require('../middlewares/pagination');

router.get('/transaction', pagination, transactionController.getAllTransaction);
router.get('/transaction/:id', transactionController.getTransactionById);

module.exports = router;