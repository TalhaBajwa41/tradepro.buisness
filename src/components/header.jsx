"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  TrendingUp,
  Bell,
  User,
  Search,
  ChevronDown,
} from "lucide-react";

export default function TradingAppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const markets = [
    { name: "BTC/USD", price: "$96,847.32", change: "+2.4%", positive: true },
    { name: "ETH/USD", price: "$3,345.18", change: "+1.8%", positive: true },
    { name: "SOL/USD", price: "$189.43", change: "-0.5%", positive: false },
    { name: "AAPL", price: "$195.71", change: "+0.3%", positive: true },
  ];

  const navLinks = [
    { name: "Markets", href: "/market" },
    { name: "Trade", href: "/trade" },
    // { name: "Portfolio", href: "/portfolio" },
    { name: "Learn", href: "/learn" },
    { name: "Earn", href: "/earn" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/20"
          : "bg-gradient-to-b from-slate-900 to-slate-900/95"
      }`}
    >
      {/* Top Market Bar */}
      <div className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 overflow-x-auto">
            {markets.map((market, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 text-xs cursor-pointer"
              >
                <span className="text-slate-400">{market.name}</span>
                <span className="text-white font-semibold">
                  {market.price}
                </span>
                <span
                  className={
                    market.positive ? "text-emerald-400" : "text-rose-400"
                  }
                >
                  {market.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              TradePro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex">
            <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 w-64">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search assets..."
                className="bg-transparent text-sm text-white placeholder-slate-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </button>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-slate-300 hover:bg-slate-800/50 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isUserOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/withdrawal"
                    className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Withdrawal
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/deposit"
              className="hidden sm:block px-6 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-200"
            >
              Deposit
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 py-4 space-y-2 bg-slate-900 border-t border-slate-800/50">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800/50 rounded-lg"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/deposit"
            className="block mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg text-center"
          >
            Deposit
          </Link>
        </div>
      </div>
    </header>
  );
}