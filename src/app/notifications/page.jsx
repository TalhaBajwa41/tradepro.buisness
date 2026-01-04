"use client"
import React, { useState } from "react";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "trade",
      title: "Trade Executed",
      message: "Your buy order for 0.5 BTC at $96,847.32 has been executed successfully.",
      time: "2 minutes ago",
      read: false,
      icon: "chart",
    },
    {
      id: 2,
      type: "alert",
      title: "Price Alert",
      message: "ETH/USD has reached your target price of $3,345.18",
      time: "15 minutes ago",
      read: false,
      icon: "bell",
    },
    {
      id: 3,
      type: "deposit",
      title: "Deposit Confirmed",
      message: "Your deposit of $5,000 has been confirmed and added to your account.",
      time: "1 hour ago",
      read: true,
      icon: "dollar",
    },
    {
      id: 4,
      type: "security",
      title: "Security Alert",
      message: "New login detected from Chrome on Windows. If this wasn't you, please secure your account.",
      time: "3 hours ago",
      read: true,
      icon: "shield",
    },
    {
      id: 5,
      type: "trade",
      title: "Limit Order Filled",
      message: "Your sell limit order for SOL/USD at $189.43 has been filled.",
      time: "5 hours ago",
      read: true,
      icon: "chart",
    },
    {
      id: 6,
      type: "system",
      title: "System Update",
      message: "TradePro will undergo scheduled maintenance on Jan 5, 2026 from 2:00 AM to 4:00 AM UTC.",
      time: "1 day ago",
      read: true,
      icon: "info",
    },
    {
      id: 7,
      type: "withdrawal",
      title: "Withdrawal Processed",
      message: "Your withdrawal of $2,500 has been processed and will arrive in 1-2 business days.",
      time: "2 days ago",
      read: true,
      icon: "dollar",
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (iconType) => {
    switch (iconType) {
      case "chart":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "bell":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case "dollar":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "shield":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "info":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "trade":
        return "bg-emerald-500/10 text-emerald-500";
      case "alert":
        return "bg-amber-500/10 text-amber-500";
      case "deposit":
      case "withdrawal":
        return "bg-cyan-500/10 text-cyan-500";
      case "security":
        return "bg-rose-500/10 text-rose-500";
      case "system":
        return "bg-slate-500/10 text-slate-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
              <p className="text-slate-400">
                You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
            <button className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
              Mark all as read
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 mt-6 overflow-x-auto">
            {[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
              { label: "Trades", value: "trade" },
              { label: "Alerts", value: "alert" },
              { label: "Deposits", value: "deposit" },
              { label: "Security", value: "security" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === tab.value
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
              <p className="text-slate-400">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`relative bg-slate-900/50 border border-slate-800/50 rounded-xl p-4 hover:bg-slate-800/50 transition-all cursor-pointer ${
                  !notif.read ? "border-l-4 border-l-emerald-500" : ""
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(notif.type)}`}>
                    {getIcon(notif.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-semibold">{notif.title}</h3>
                      {!notif.read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{notif.message}</p>
                    <span className="text-xs text-slate-500">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}