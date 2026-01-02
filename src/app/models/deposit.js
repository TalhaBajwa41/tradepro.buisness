import mongoose from 'mongoose';

const DepositSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [100, 'Minimum deposit is PKR 100']
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction ID is required'],
      trim: true
    },
    paymentMethod: {
      type: String,
      enum: ['jazzcash', 'easypaisa', 'bank'],
      default: 'jazzcash'
    },
    screenshot: {
      type: String, // URL or base64 string
      required: [true, 'Payment screenshot is required']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    adminNote: {
      type: String,
      default: null
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    approvedAt: {
      type: Date,
      default: null
    },
    rejectedAt: {
      type: Date,
      default: null
    }
  },
  { 
    timestamps: true // Adds createdAt and updatedAt
  }
);

// Index for faster queries
DepositSchema.index({ userId: 1, status: 1 });
DepositSchema.index({ createdAt: -1 });

export default mongoose.models.Deposit || mongoose.model('Deposit', DepositSchema);