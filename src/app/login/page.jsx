"use client"
import React, { useState } from 'react';
import { TrendingUp, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Shield, Chrome, AlertCircle } from 'lucide-react';

export default function TradingLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage if remember me is checked
        if (rememberMe && data.token) {
          localStorage.setItem('authToken', data.token);
        }

        // Store user data
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // Show success message
        console.log('Login successful:', data.user);
        
        // Redirect to home/dashboard page
        // In a real Next.js app, use: router.push('/dashboard')
        window.location.href = '/dashboard';
        
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Implement OAuth login here
    setError(`${provider} login is not yet implemented`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold text-white">TradePro</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Welcome Back to
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Your Trading Hub
                </span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Access your portfolio, monitor markets in real-time, and execute trades with institutional-grade tools.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-8">
            {[
              { icon: <Sparkles className="w-5 h-5" />, text: 'Real-time market data' },
              { icon: <Shield className="w-5 h-5" />, text: 'Bank-level security' },
              { icon: <TrendingUp className="w-5 h-5" />, text: 'Advanced analytics' }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-slate-300">
                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-emerald-400">
                  {feature.icon}
                </div>
                <span className="text-lg">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            {[
              { value: '500K+', label: 'Active Users' },
              { value: '$2.4B', label: 'Trading Volume' },
              { value: '180+', label: 'Countries' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
          
          <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur-md opacity-75"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold text-white">TradePro</span>
            </div>

            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-slate-400">Enter your credentials to access your account</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange('password')}
                        placeholder="••••••••"
                        disabled={isLoading}
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-4 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => console.log('Forgot password clicked')}
                    className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group relative w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In to Your Account
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <link rel="stylesheet" href="dashboard" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-900/70 text-slate-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Chrome className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-slate-300 group-hover:text-white transition-colors font-medium">Google</span>
                </button>
                <button 
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                  <span className="text-slate-300 group-hover:text-white transition-colors font-medium">Apple</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-slate-400 text-sm">
                Don't have an account?{' '}
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}