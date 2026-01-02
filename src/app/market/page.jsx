"use client"
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star, ArrowUpRight, ArrowDownRight, BarChart3, Activity, Globe, Clock, DollarSign, Percent, Eye, ChevronDown, ChevronUp } from 'lucide-react';

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('volume');
  const [sortOrder, setSortOrder] = useState('desc');
  const [favorites, setFavorites] = useState([]);
  const [timeFrame, setTimeFrame] = useState('24h');

  const categories = [
    { id: 'all', name: 'All Markets', count: 350 },
    { id: 'crypto', name: 'Crypto', count: 180 },
    { id: 'stocks', name: 'Stocks', count: 120 },
    { id: 'forex', name: 'Forex', count: 50 }
  ];

  const markets = [
    { 
      id: 1, symbol: 'BTC/USD', name: 'Bitcoin', category: 'crypto', 
      price: '96,847.32', change: '+2.4%', changeValue: '+2,267.43', positive: true, 
      volume: '$42.8B', marketCap: '$1.9T', high: '97,234.12', low: '94,582.43',
      trades: '2.4M', dominance: '48.2%'
    },
    { 
      id: 2, symbol: 'ETH/USD', name: 'Ethereum', category: 'crypto',
      price: '3,345.18', change: '+1.8%', changeValue: '+59.12', positive: true,
      volume: '$18.3B', marketCap: '$402B', high: '3,402.56', low: '3,289.32',
      trades: '1.8M', dominance: '18.4%'
    },
    { 
      id: 3, symbol: 'SOL/USD', name: 'Solana', category: 'crypto',
      price: '189.43', change: '-0.5%', changeValue: '-0.95', positive: false,
      volume: '$5.2B', marketCap: '$89B', high: '194.23', low: '186.45',
      trades: '890K', dominance: '2.1%'
    },
    { 
      id: 4, symbol: 'BNB/USD', name: 'Binance Coin', category: 'crypto',
      price: '612.84', change: '+3.2%', changeValue: '+19.01', positive: true,
      volume: '$3.1B', marketCap: '$91B', high: '624.12', low: '598.34',
      trades: '720K', dominance: '3.8%'
    },
    { 
      id: 5, symbol: 'XRP/USD', name: 'Ripple', category: 'crypto',
      price: '2.34', change: '+5.6%', changeValue: '+0.12', positive: true,
      volume: '$8.9B', marketCap: '$134B', high: '2.45', low: '2.21',
      trades: '1.2M', dominance: '5.2%'
    },
    { 
      id: 6, symbol: 'ADA/USD', name: 'Cardano', category: 'crypto',
      price: '1.08', change: '-1.2%', changeValue: '-0.01', positive: false,
      volume: '$2.7B', marketCap: '$38B', high: '1.12', low: '1.05',
      trades: '650K', dominance: '1.4%'
    },
    { 
      id: 7, symbol: 'AAPL', name: 'Apple Inc.', category: 'stocks',
      price: '195.71', change: '+0.3%', changeValue: '+0.58', positive: true,
      volume: '$68.4B', marketCap: '$3.0T', high: '196.45', low: '194.82',
      trades: '45M', dominance: 'N/A'
    },
    { 
      id: 8, symbol: 'TSLA', name: 'Tesla Inc.', category: 'stocks',
      price: '248.42', change: '+2.1%', changeValue: '+5.11', positive: true,
      volume: '$52.3B', marketCap: '$789B', high: '251.23', low: '245.67',
      trades: '38M', dominance: 'N/A'
    },
    { 
      id: 9, symbol: 'EUR/USD', name: 'Euro / US Dollar', category: 'forex',
      price: '1.0842', change: '+0.15%', changeValue: '+0.0016', positive: true,
      volume: '$1.2T', marketCap: 'N/A', high: '1.0858', low: '1.0826',
      trades: '12M', dominance: 'N/A'
    },
    { 
      id: 10, symbol: 'GBP/USD', name: 'British Pound / US Dollar', category: 'forex',
      price: '1.2634', change: '-0.08%', changeValue: '-0.0010', positive: false,
      volume: '$890B', marketCap: 'N/A', high: '1.2651', low: '1.2618',
      trades: '9.2M', dominance: 'N/A'
    },
  ];

  const globalStats = [
    { label: 'Total Market Cap', value: '$3.2T', change: '+2.4%', positive: true },
    { label: '24h Volume', value: '$156B', change: '+8.7%', positive: true },
    { label: 'BTC Dominance', value: '48.2%', change: '-0.3%', positive: false },
    { label: 'Active Markets', value: '18,432', change: '+124', positive: true }
  ];

  const topGainers = markets.filter(m => m.positive).slice(0, 3);
  const topLosers = markets.filter(m => !m.positive).slice(0, 3);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredMarkets = markets
    .filter(m => selectedCategory === 'all' || m.category === selectedCategory)
    .filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-800/50 pb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Global Markets
              <span className="block text-2xl lg:text-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                Real-Time Trading Data
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Track live prices, analyze trends, and discover trading opportunities across crypto, stocks, and forex markets
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {globalStats.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-xs font-medium flex items-center ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gainers & Losers */}
      <section className="py-8 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Top Gainers</h3>
              </div>
              <div className="space-y-3">
                {topGainers.map((market, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {market.symbol.split('/')[0].slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{market.name}</div>
                        <div className="text-xs text-slate-400">{market.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">${market.price}</div>
                      <div className="text-xs font-medium text-emerald-400">{market.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Top Losers</h3>
              </div>
              <div className="space-y-3">
                {topLosers.map((market, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {market.symbol.split('/')[0].slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{market.name}</div>
                        <div className="text-xs text-slate-400">{market.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">${market.price}</div>
                      <div className="text-xs font-medium text-rose-400">{market.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters & Search */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search markets..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                        : 'bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                    <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* Time Frame */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl">
                <Clock className="w-4 h-4 text-slate-400" />
                <select
                  value={timeFrame}
                  onChange={(e) => setTimeFrame(e.target.value)}
                  className="bg-transparent text-white text-sm outline-none cursor-pointer"
                >
                  <option value="1h">1 Hour</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Market Table */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800/30 border-b border-slate-800/50 text-sm font-semibold text-slate-400">
              <div className="col-span-1 flex items-center">
                <Star className="w-4 h-4" />
              </div>
              <div className="col-span-3 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                Name {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
              </div>
              <div className="col-span-2 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('price')}>
                Price {sortBy === 'price' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
              </div>
              <div className="col-span-2 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('change')}>
                Change {sortBy === 'change' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
              </div>
              <div className="col-span-2 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('volume')}>
                Volume {sortBy === 'volume' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 inline" /> : <ChevronDown className="w-4 h-4 inline" />)}
              </div>
              <div className="col-span-2 text-right">Market Cap</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-800/50">
              {filteredMarkets.map((market) => (
                <div
                  key={market.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-800/30 transition-all duration-200 group cursor-pointer"
                >
                  {/* Favorite */}
                  <div className="col-span-1 flex items-center">
                    <button
                      onClick={() => toggleFavorite(market.id)}
                      className="text-slate-400 hover:text-yellow-400 transition-colors"
                    >
                      <Star className={`w-5 h-5 ${favorites.includes(market.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </button>
                  </div>

                  {/* Name */}
                  <div className="col-span-3 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {market.symbol.split('/')[0].slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {market.name}
                      </div>
                      <div className="text-sm text-slate-400">{market.symbol}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-right flex flex-col justify-center">
                    <div className="font-semibold text-white">${market.price}</div>
                    <div className="text-xs text-slate-400">{market.changeValue}</div>
                  </div>

                  {/* Change */}
                  <div className="col-span-2 text-right flex flex-col justify-center">
                    <div className={`font-semibold flex items-center justify-end ${market.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {market.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {market.change}
                    </div>
                    <div className="text-xs text-slate-400">{market.trades} trades</div>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2 text-right flex flex-col justify-center">
                    <div className="font-semibold text-white">{market.volume}</div>
                    <div className="text-xs text-slate-400">24h volume</div>
                  </div>

                  {/* Market Cap */}
                  <div className="col-span-2 text-right flex flex-col justify-center">
                    <div className="font-semibold text-white">{market.marketCap}</div>
                    {market.dominance !== 'N/A' && (
                      <div className="text-xs text-slate-400">{market.dominance} dom</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Showing Results */}
          <div className="mt-4 text-center text-sm text-slate-400">
            Showing {filteredMarkets.length} of {markets.length} markets
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Market Activity</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Trading volume increased by 8.7% in the last 24 hours, showing strong market activity across all asset classes.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Trending Assets</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bitcoin and Ethereum lead the market with significant gains, while new altcoins show promising growth potential.
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Global Markets</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Access to 18,000+ markets worldwide with real-time data feeds and institutional-grade execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}