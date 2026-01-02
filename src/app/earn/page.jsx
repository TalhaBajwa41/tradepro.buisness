"use client"
import React, { useState } from 'react';
import { TrendingUp, Wallet, Lock, Zap, DollarSign, Shield, Clock, ArrowRight, Info, ChevronDown, ChevronUp, Percent, Trophy, Gift } from 'lucide-react';

export default function EarnPage() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedTab, setSelectedTab] = useState('staking');

  const stakingOptions = [
    {
      id: 1,
      coin: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      apy: '5.2',
      minAmount: '0.001',
      lockPeriod: 'Flexible',
      totalStaked: '$2.4B',
      risk: 'Low',
      color: 'from-orange-500 to-amber-600',
      description: 'Earn passive income on your Bitcoin holdings with flexible withdrawal options.'
    },
    {
      id: 2,
      coin: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      apy: '4.8',
      minAmount: '0.01',
      lockPeriod: 'Flexible',
      totalStaked: '$1.8B',
      risk: 'Low',
      color: 'from-blue-500 to-indigo-600',
      description: 'Stake your ETH and earn rewards while supporting the Ethereum network.'
    },
    {
      id: 3,
      coin: 'Solana',
      symbol: 'SOL',
      icon: '◎',
      apy: '7.5',
      minAmount: '1',
      lockPeriod: '30 Days',
      totalStaked: '$890M',
      risk: 'Medium',
      color: 'from-purple-500 to-pink-600',
      description: 'Higher rewards with locked staking period for serious investors.'
    },
    {
      id: 4,
      coin: 'Binance Coin',
      symbol: 'BNB',
      icon: 'B',
      apy: '6.3',
      minAmount: '0.1',
      lockPeriod: 'Flexible',
      totalStaked: '$1.2B',
      risk: 'Low',
      color: 'from-yellow-500 to-orange-600',
      description: 'Earn rewards on BNB with instant access to your funds.'
    },
  ];

  const savingsOptions = [
    {
      id: 1,
      name: 'High Yield Savings',
      apy: '8.5',
      minDeposit: '$100',
      maxDeposit: '$50,000',
      term: 'Flexible',
      currency: 'USDT',
      icon: '💰',
      color: 'from-emerald-500 to-teal-600',
      description: 'High-yield savings with flexible withdrawals and competitive rates.'
    },
    {
      id: 2,
      name: 'Fixed Term Deposit',
      apy: '12.0',
      minDeposit: '$500',
      maxDeposit: '$100,000',
      term: '90 Days',
      currency: 'USDC',
      icon: '🏦',
      color: 'from-blue-500 to-cyan-600',
      description: 'Lock your funds for higher returns with guaranteed fixed rates.'
    },
    {
      id: 3,
      name: 'DeFi Yield Pool',
      apy: '15.2',
      minDeposit: '$1,000',
      maxDeposit: 'Unlimited',
      term: '60 Days',
      currency: 'DAI',
      icon: '🌊',
      color: 'from-purple-500 to-indigo-600',
      description: 'Access DeFi yields with automated strategy optimization.'
    },
  ];

  const referralTiers = [
    { level: 'Bronze', referrals: '0-10', commission: '10%', bonus: '$50' },
    { level: 'Silver', referrals: '11-50', commission: '15%', bonus: '$200' },
    { level: 'Gold', referrals: '51-100', commission: '20%', bonus: '$500' },
    { level: 'Platinum', referrals: '100+', commission: '25%', bonus: '$2,000' },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$8.2B', icon: Lock, change: '+12.5%' },
    { label: 'Active Earners', value: '245K', icon: TrendingUp, change: '+8.3%' },
    { label: 'Total Rewards Paid', value: '$420M', icon: DollarSign, change: '+15.7%' },
    { label: 'Average APY', value: '8.7%', icon: Percent, change: '+2.1%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">TradePro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-300 hover:text-white transition">Markets</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Trade</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Portfolio</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Learn</a>
            <a href="#" className="text-white font-semibold">Earn</a>
          </nav>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Earn Crypto Rewards
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Put your crypto to work and earn passive income through staking, savings, and liquidity pools
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-8 h-8 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setSelectedTab('staking')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedTab === 'staking'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50'
            }`}
          >
            <Lock className="w-5 h-5" />
            Staking
          </button>
          <button
            onClick={() => setSelectedTab('savings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedTab === 'savings'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50'
            }`}
          >
            <Wallet className="w-5 h-5" />
            Savings
          </button>
          <button
            onClick={() => setSelectedTab('referral')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedTab === 'referral'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                : 'bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50'
            }`}
          >
            <Gift className="w-5 h-5" />
            Referral Program
          </button>
        </div>

        {/* Staking Options */}
        {selectedTab === 'staking' && (
          <div className="grid md:grid-cols-2 gap-6">
            {stakingOptions.map((option) => (
              <div
                key={option.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition overflow-hidden"
              >
                {/* Card Header */}
                <div className={`h-24 bg-gradient-to-br ${option.color} flex items-center justify-between px-6`}>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{option.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{option.coin}</h3>
                      <p className="text-white/80">{option.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{option.apy}%</div>
                    <div className="text-white/80 text-sm">APY</div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="text-slate-300 mb-6">{option.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Min Amount</div>
                      <div className="font-semibold">{option.minAmount} {option.symbol}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Lock Period</div>
                      <div className="font-semibold">{option.lockPeriod}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Total Staked</div>
                      <div className="font-semibold">{option.totalStaked}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Risk Level</div>
                      <div className={`font-semibold ${option.risk === 'Low' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                        {option.risk}
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition flex items-center justify-center gap-2">
                    Start Staking
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Savings Options */}
        {selectedTab === 'savings' && (
          <div className="grid md:grid-cols-3 gap-6">
            {savingsOptions.map((option) => (
              <div
                key={option.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition overflow-hidden"
              >
                {/* Card Header */}
                <div className={`h-32 bg-gradient-to-br ${option.color} flex items-center justify-center text-6xl`}>
                  {option.icon}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{option.description}</p>

                  <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                    <div className="text-center mb-2">
                      <span className="text-4xl font-bold text-emerald-400">{option.apy}%</span>
                    </div>
                    <div className="text-center text-slate-400 text-sm">Annual Percentage Yield</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Currency</span>
                      <span className="font-semibold">{option.currency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Min Deposit</span>
                      <span className="font-semibold">{option.minDeposit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Max Deposit</span>
                      <span className="font-semibold">{option.maxDeposit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Term</span>
                      <span className="font-semibold">{option.term}</span>
                    </div>
                  </div>

                  <button className="w-full bg-slate-700/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                    Deposit Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Referral Program */}
        {selectedTab === 'referral' && (
          <div className="space-y-8">
            {/* Referral Hero */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Earn Up to 25% Commission</h2>
              <p className="text-lg mb-6 text-white/90">
                Invite friends and earn passive income from their trading fees
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                <div className="text-sm text-white/80 mb-2">Your Referral Link</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://tradepro.com/ref/YOUR123"
                    readOnly
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  />
                  <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Current Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">0</div>
                <div className="text-slate-400">Total Referrals</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">$0.00</div>
                <div className="text-slate-400">Total Earned</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">10%</div>
                <div className="text-slate-400">Current Rate</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">Bronze</div>
                <div className="text-slate-400">Current Tier</div>
              </div>
            </div>

            {/* Tier Table */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-2xl font-bold">Referral Tiers</h3>
                <p className="text-slate-400 mt-2">Unlock higher commissions as you refer more users</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Tier</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Referrals</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Commission</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Sign-up Bonus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralTiers.map((tier, index) => (
                      <tr key={index} className="border-t border-slate-700/50 hover:bg-slate-700/30 transition">
                        <td className="px-6 py-4">
                          <span className="font-semibold">{tier.level}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{tier.referrals}</td>
                        <td className="px-6 py-4">
                          <span className="text-emerald-400 font-semibold">{tier.commission}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-emerald-400 font-semibold">{tier.bonus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Security Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-700/50">
        <h2 className="text-3xl font-bold mb-12 text-center">Secure & Trusted</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bank-Level Security</h3>
            <p className="text-slate-400">Your funds are protected with industry-leading security measures</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Rewards</h3>
            <p className="text-slate-400">Earn rewards daily and withdraw anytime with no hidden fees</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-slate-400">Our team is always here to help you maximize your earnings</p>
          </div>
        </div>
      </section>
    </div>
  );
}