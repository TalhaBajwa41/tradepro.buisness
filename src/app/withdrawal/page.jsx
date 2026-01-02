"use client"
import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  CreditCard, 
  Building2, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Info,
  Wallet
} from 'lucide-react';

export default function WithdrawalPage() {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'bank',
    accountNumber: '',
    accountName: '',
    bankName: '',
    ifscCode: '',
    upiId: '',
    cardNumber: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock user data - in real app, fetch from API
  const availableBalance = 15420.50;
  const minWithdrawal = 100;
  const maxWithdrawal = 10000;

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    // Validation
    const amount = parseFloat(formData.amount);
    
    if (!formData.amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount < minWithdrawal) {
      setError(`Minimum withdrawal amount is PKR ${minWithdrawal}`);
      return;
    }

    if (amount > maxWithdrawal) {
      setError(`Maximum withdrawal amount is PKR ${maxWithdrawal}`);
      return;
    }

    if (amount > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    // Payment method specific validation
    if (formData.paymentMethod === 'bank') {
      if (!formData.accountNumber || !formData.accountName || !formData.bankName) {
        setError('Please fill in all bank details');
        return;
      }
    } else if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) {
        setError('Please enter UPI ID');
        return;
      }
    } else if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.accountName) {
        setError('Please fill in all card details');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          paymentMethod: formData.paymentMethod,
          accountDetails: {
            accountNumber: formData.accountNumber,
            accountName: formData.accountName,
            bankName: formData.bankName,
            ifscCode: formData.ifscCode,
            upiId: formData.upiId,
            cardNumber: formData.cardNumber,
          },
          notes: formData.notes
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            amount: '',
            paymentMethod: 'bank',
            accountNumber: '',
            accountName: '',
            bankName: '',
            ifscCode: '',
            upiId: '',
            cardNumber: '',
            notes: ''
          });
          setSuccess(false);
        }, 3000);
      } else {
        setError(data.message || 'Withdrawal request failed');
      }
    } catch (err) {
      console.error('Withdrawal error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: <Building2 className="w-5 h-5" /> },
    { id: 'upi', name: 'UPI/JazzCash', icon: <Wallet className="w-5 h-5" /> },
    { id: 'card', name: 'Debit Card', icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur-md opacity-75"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Withdraw Funds</h1>
            <p className="text-slate-400">Request a withdrawal from your account</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Available Balance</p>
              <p className="text-4xl font-bold text-white">PKR {availableBalance.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-500/20 p-4 rounded-xl">
              <DollarSign className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-6 text-sm">
            <div>
              <span className="text-slate-400">Min: </span>
              <span className="text-white font-semibold">PKR {minWithdrawal}</span>
            </div>
            <div>
              <span className="text-slate-400">Max: </span>
              <span className="text-white font-semibold">PKR {maxWithdrawal}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
            {/* Success Message */}
            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-xl p-4 flex items-start space-x-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-400 font-semibold">Withdrawal Request Submitted!</p>
                  <p className="text-sm text-emerald-400/80 mt-1">Your request is being processed. You'll receive the funds within 24-48 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start space-x-3 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Withdrawal Amount (PKR)</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center">
                    <DollarSign className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={handleChange('amount')}
                      placeholder="0.00"
                      min={minWithdrawal}
                      max={maxWithdrawal}
                      step="0.01"
                      disabled={isSubmitting}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Minimum: PKR {minWithdrawal}</span>
                  <span>Maximum: PKR {maxWithdrawal}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      disabled={isSubmitting}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        formData.paymentMethod === method.id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      } disabled:opacity-50`}
                    >
                      <div className={`mb-2 ${formData.paymentMethod === method.id ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {method.icon}
                      </div>
                      <span className={`text-xs font-medium ${formData.paymentMethod === method.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Transfer Fields */}
              {formData.paymentMethod === 'bank' && (
                <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl">
                  <h3 className="text-sm font-semibold text-white flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-emerald-400" />
                    Bank Account Details
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Account Holder Name</label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={handleChange('accountName')}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Account Number</label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={handleChange('accountNumber')}
                      placeholder="1234567890"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Bank Name</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={handleChange('bankName')}
                      placeholder="State Bank of Pakistan"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">IFSC/Swift Code (Optional)</label>
                    <input
                      type="text"
                      value={formData.ifscCode}
                      onChange={handleChange('ifscCode')}
                      placeholder="SBIN0001234"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {/* UPI Fields */}
              {formData.paymentMethod === 'upi' && (
                <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl">
                  <h3 className="text-sm font-semibold text-white flex items-center">
                    <Wallet className="w-4 h-4 mr-2 text-emerald-400" />
                    UPI/JazzCash Details
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">UPI ID / JazzCash Number</label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={handleChange('upiId')}
                      placeholder="username@jazzcash or 03001234567"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {/* Card Fields */}
              {formData.paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-slate-800/30 rounded-xl">
                  <h3 className="text-sm font-semibold text-white flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-emerald-400" />
                    Debit Card Details
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Card Holder Name</label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={handleChange('accountName')}
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Card Number (Last 4 digits)</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={handleChange('cardNumber')}
                      placeholder="1234"
                      maxLength="4"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  placeholder="Any special instructions..."
                  rows="3"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Request...
                    </>
                  ) : (
                    <>
                      Request Withdrawal
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Processing Time */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-cyan-500/20 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white">Processing Time</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Bank Transfer: 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>UPI/JazzCash: 2-4 hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Debit Card: 3-5 business days</span>
              </li>
            </ul>
          </div>

          {/* Security Info */}
          <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white">Security</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>All transactions are encrypted</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Two-factor authentication required</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Instant email notifications</span>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Info className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-400">Important</h3>
            </div>
            <ul className="space-y-2 text-xs text-yellow-200/80">
              <li>• Ensure your account details are correct</li>
              <li>• Withdrawals are processed on business days only</li>
              <li>• A small processing fee may apply</li>
              <li>• Contact support for withdrawal issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}