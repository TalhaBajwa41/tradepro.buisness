"use client"
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [orderType, setOrderType] = useState('limit');
  const [currentPrice, setCurrentPrice] = useState(45230.50);
  const [priceChange, setPriceChange] = useState(2.34);

  // Generate mock price data
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const data = [];
    let basePrice = 45000;
    for (let i = 0; i < 50; i++) {
      basePrice += (Math.random() - 0.5) * 200;
      data.push({
        time: `${i}m`,
        price: basePrice
      });
    }
    setChartData(data);
  }, []);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 50;
        return prev + change;
      });
      setPriceChange((Math.random() - 0.5) * 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaceOrder = () => {
    alert(`${activeTab.toUpperCase()} order placed!\nAmount: ${amount}\nPrice: ${orderType === 'market' ? 'Market Price' : price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trading Platform
          </h1>
          <p className="text-slate-400">Real-time cryptocurrency trading</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Info */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-baseline gap-4 mb-4">
                <h2 className="text-3xl font-bold">${currentPrice.toFixed(2)}</h2>
                <div className={`flex items-center gap-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span className="font-semibold">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%</span>
                </div>
              </div>
              <div className="text-sm text-slate-400">BTC/USD</div>
            </div>

            {/* Chart */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '24h High', value: '$46,234.50' },
                { label: '24h Low', value: '$44,123.30' },
                { label: '24h Volume', value: '23.4K BTC' },
                { label: 'Market Cap', value: '$890B' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className="text-lg font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Place Order</h3>

              {/* Buy/Sell Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'buy' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'sell' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Order Type */}
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="limit">Limit</option>
                  <option value="market">Market</option>
                </select>
              </div>

              {/* Price Input */}
              {orderType === 'limit' && (
                <div className="mb-4">
                  <label className="block text-sm text-slate-400 mb-2">Price (USD)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm text-slate-400 mb-2">Amount (BTC)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Total */}
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total</span>
                  <span className="font-semibold">
                    ${((parseFloat(amount) || 0) * (orderType === 'market' ? currentPrice : parseFloat(price) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'buy'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {activeTab === 'buy' ? 'Buy' : 'Sell'} BTC
              </button>
            </div>

            {/* Balance Info */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Balance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">USD</span>
                  <span className="font-semibold">$12,450.30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">BTC</span>
                  <span className="font-semibold">0.2456 BTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}