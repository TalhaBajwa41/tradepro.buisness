"use client"
import React from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';

export default function HelpFooter() {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (format: country code + number, no spaces or special chars)
    const phoneNumber = '1234567890'; // Change this to your actual number
    const message = encodeURIComponent('Hello! I need help with...');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleHelpClick = () => {
    // Replace with your help page URL or action
    window.open('/help', '_blank'); // Change this to your actual help page URL
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800/50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Need Assistance?
            </h2>
            <p className="text-slate-400 text-lg">
              We're here to help you 24/7
            </p>
          </div>

          {/* Help Options */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Help Center Card */}
            <button
              onClick={handleHelpClick}
              className="group relative p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <HelpCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Help Center</h3>
                  <p className="text-slate-400 text-sm">
                    Browse FAQs, guides, and tutorials
                  </p>
                </div>

                <div className="flex items-center text-emerald-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  <span>Visit Help Center</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* WhatsApp Card */}
            <button
              onClick={handleWhatsAppClick}
              className="group relative p-8 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">WhatsApp Support</h3>
                  <p className="text-slate-400 text-sm">
                    Chat with our support team instantly
                  </p>
                </div>

                <div className="flex items-center text-green-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
                  <span>Start Chat</span>
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/50">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              © 2024 TradePro. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
    </footer>
  );
}