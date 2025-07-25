// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { userVerification } = require('../Middlewares/AuthMiddleware');

const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require('../controllers/TransactionController');

// CREATE a new transaction (requires login)
router.post('/', userVerification, addTransaction);

// READ all transactions for logged-in user
router.get('/', userVerification, getTransactions);

// READ a single transaction by ID
router.get('/:id', userVerification, getTransactionById);

// UPDATE a transaction by ID
router.put('/:id', userVerification, updateTransaction);

// DELETE a transaction by ID
router.delete('/:id', userVerification, deleteTransaction);

module.exports = router;
