"use client"
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Gift, Star, Zap, Shield, Award, ArrowUpRight, ArrowDownRight, Clock, BarChart3, Activity, Users, Target, ChevronDown, Search, Filter } from 'lucide-react';

export default function TradingPlatformPage() {
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD');
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [leverage, setLeverage] = useState('1x');
  const [orderType, setOrderType] = useState('market');
  const [activeTab, setActiveTab] = useState('all');

  const cryptoAssets = [
    { symbol: 'BTC/USD', name: 'Bitcoin', price: '96,847.32', change: '+2.4%', positive: true, volume: '$42.8B', high: '97,234.12', low: '94,582.43' },
    { symbol: 'ETH/USD', name: 'Ethereum', price: '3,345.18', change: '+1.8%', positive: true, volume: '$18.3B', high: '3,402.56', low: '3,289.32' },
    { symbol: 'SOL/USD', name: 'Solana', price: '189.43', change: '-0.5%', positive: false, volume: '$5.2B', high: '194.23', low: '186.45' },
    { symbol: 'BNB/USD', name: 'Binance', price: '612.84', change: '+3.2%', positive: true, volume: '$3.1B', high: '624.12', low: '598.34' },
    { symbol: 'XRP/USD', name: 'Ripple', price: '2.34', change: '+5.6%', positive: true, volume: '$8.9B', high: '2.45', low: '2.21' },
    { symbol: 'ADA/USD', name: 'Cardano', price: '1.08', change: '-1.2%', positive: false, volume: '$2.7B', high: '1.12', low: '1.05' },
  ];

  const bonuses = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Welcome Bonus',
      amount: '10%',
      description: 'Get $100 bonus on your first deposit of $1000 or more',
      code: 'WELCOME100',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Deposit Bonus',
      amount: '4% to 6%',
      description: 'Get 4% to 6% bonus on deposits up to $500',
      code: 'DEPOSIT50',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Trading Bonus',
      amount: '20%',
      description: 'Earn 20% cashback on trading fees for 30 days',
      code: 'TRADE20',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Referral Bonus',
      amount: '$25',
      description: 'Earn $25 for each friend you refer who deposits 300$ or more',
      code: 'REFER50',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  const stats = [
    { label: '24h Volume', value: '$2.4B', icon: <BarChart3 className="w-5 h-5" />, change: '+12.5%', positive: true },
    { label: 'Active Traders', value: '524,891', icon: <Users className="w-5 h-5" />, change: '+8.3%', positive: true },
    { label: 'Total Trades', value: '1.2M', icon: <Activity className="w-5 h-5" />, change: '+15.7%', positive: true },
    { label: 'Avg. Profit', value: '18.4%', icon: <Target className="w-5 h-5" />, change: '+2.1%', positive: true }
  ];

  const selectedAssetData = cryptoAssets.find(a => a.symbol === selectedAsset) || cryptoAssets[0];

  const handleTrade = () => {
    if (amount) {
      alert(`${tradeType.toUpperCase()} Order placed for ${amount} ${selectedAsset}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Stats Bar */}
      <section className="relative overflow-hidden pt-20 pb-8 border-b border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-emerald-400">{stat.icon}</div>
                  <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Trading Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel - Market List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Markets</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
                      <Search className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-4 bg-slate-800/50 p-1 rounded-lg">
                  {['all', 'favorites', 'gainers'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Asset List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {cryptoAssets.map((asset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAsset(asset.symbol)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                        selectedAsset === asset.symbol
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : 'bg-slate-800/30 hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                            {asset.symbol.split('/')[0].slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">{asset.name}</div>
                            <div className="text-xs text-slate-400">{asset.symbol}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white text-sm">${asset.price}</div>
                          <div className={`text-xs font-medium flex items-center ${asset.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {asset.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {asset.change}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel - Trading Interface */}
            <div className="lg:col-span-2 space-y-4">
              {/* Chart Area */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedAssetData.name}</h3>
                    <p className="text-sm text-slate-400">{selectedAsset}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">${selectedAssetData.price}</div>
                    <div className={`text-sm font-medium flex items-center justify-end ${selectedAssetData.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {selectedAssetData.positive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {selectedAssetData.change}
                    </div>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 bg-slate-800/30 rounded-xl flex items-center justify-center mb-4 border border-slate-700/50">
                  <div className="text-center text-slate-400">
                    <BarChart3 className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>Trading Chart</p>
                    <p className="text-xs mt-1">Real-time price visualization</p>
                  </div>
                </div>

                {/* Market Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">24h Volume</div>
                    <div className="text-sm font-semibold text-white">{selectedAssetData.volume}</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">24h High</div>
                    <div className="text-sm font-semibold text-emerald-400">${selectedAssetData.high}</div>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">24h Low</div>
                    <div className="text-sm font-semibold text-rose-400">${selectedAssetData.low}</div>
                  </div>
                </div>
              </div>

              {/* Trading Panel */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex space-x-2 mb-6">
                  <button
                    onClick={() => setTradeType('buy')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      tradeType === 'buy'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    Buy / Long
                  </button>
                  <button
                    onClick={() => setTradeType('sell')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      tradeType === 'sell'
                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    Sell / Short
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Order Type */}
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Order Type</label>
                    <div className="flex space-x-2">
                      {['market', 'limit', 'stop'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setOrderType(type)}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            orderType === type
                              ? 'bg-slate-700 text-white'
                              : 'bg-slate-800/50 text-slate-400 hover:text-white'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Amount (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Leverage */}
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Leverage</label>
                    <div className="grid grid-cols-5 gap-2">
                      {['1x', '2x', '5x', '10x', '20x'].map((lev) => (
                        <button
                          key={lev}
                          onClick={() => setLeverage(lev)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            leverage === lev
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                              : 'bg-slate-800/50 text-slate-400 hover:text-white'
                          }`}
                        >
                          {lev}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trade Button */}
                  <button
                    onClick={handleTrade}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      tradeType === 'buy'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-2xl hover:shadow-emerald-500/50'
                        : 'bg-gradient-to-r from-rose-500 to-red-600 hover:shadow-2xl hover:shadow-rose-500/50'
                    } text-white`}
                  >
                    {tradeType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                  </button>

                  {/* Info */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span>Protected by advanced risk management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full mb-4">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Exclusive Offers</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Trading Bonuses & Rewards
            </h2>
            <p className="text-slate-400">Maximize your profits with our exclusive bonus programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonuses.map((bonus, idx) => (
              <div
                key={idx}
                className={`group relative bg-slate-900/50 backdrop-blur-sm border ${bonus.borderColor} rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <div className={`w-14 h-14 ${bonus.bgColor} rounded-xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform`}>
                    {bonus.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{bonus.title}</h3>
                  
                  <div className={`text-3xl font-bold bg-gradient-to-r ${bonus.color} bg-clip-text text-transparent mb-3`}>
                    {bonus.amount}
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {bonus.description}
                  </p>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <span className="text-xs text-slate-400">Promo Code</span>
                    <span className="text-sm font-mono font-semibold text-emerald-400">{bonus.code}</span>
                  </div>
                  
                  <button className="w-full mt-4 py-2.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg transition-all duration-200 group-hover:border-emerald-500/50">
                    Claim Bonus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Info */}
      <section className="py-8 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-2">Important Bonus Information</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  All bonuses are subject to terms and conditions. Bonus funds must meet trading volume requirements before withdrawal. Welcome bonus requires minimum deposit of $500. Deposit bonus applies to first-time deposits only. Trading bonus cashback is credited weekly. Referral bonus paid when referred user completes verification and makes first deposit. Maximum bonus amounts and wagering requirements apply. Please read full terms before claiming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}