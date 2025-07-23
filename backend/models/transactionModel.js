// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // reference to the User collection
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['sent', 'received'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'food',
      'rent',
      'bills',
      'taxes',
      'clothing',
      'savings',
      'miscellaneous'
    ],
    required: true
  },
  note: {
    type: String,
    default: '' // Optional, defaults to empty string if not provided
  },
  timestamp: {
    type: Date,
    required: true,
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

module.exports = mongoose.model('Transaction', transactionSchema);
