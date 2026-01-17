import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'

export default function SignupGatewayScreen() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required')
      return
    }

    if (!isLogin) {
      if (!formData.fullName) {
        setError('Full name is required')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
    }

    // Sign up/login successful
    setIsLoggedIn(true)
    setError('')
    
    // Redirect to home dashboard where users can access schedule, speakers, etc.
    setTimeout(() => {
      navigate('/home')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a78bfa] to-[#6366f1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-orange-500 to-red-600 opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-20">
        {/* Header */}
        <AppHeader 
          isLoggedIn={isLoggedIn} 
          onLogout={() => setIsLoggedIn(false)}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-black mb-2">
                  {isLogin ? 'Welcome Back' : 'Join Us'}
                </h1>
                <p className="text-white/60">
                  {isLogin 
                    ? 'Sign in to register for conferences' 
                    : 'Create an account to get started'}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name - Only for Signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
                    />
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
                  />
                </div>

                {/* Confirm Password - Only for Signup */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50 transition-colors"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 mt-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/60 text-sm">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Toggle between Login and Signup */}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
              >
                {isLogin ? 'Create New Account' : 'Sign In Instead'}
              </button>

              {/* Info Text */}
              <p className="text-center text-white/60 text-sm mt-8">
                {isLogin
                  ? "Don't have an account? Click 'Create New Account' above"
                  : 'Already have an account? Click "Sign In Instead" above'
                }
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 space-y-4">
              <h3 className="text-lg font-bold">Benefits of Having an Account:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#a78bfa] font-bold text-lg">✓</span>
                  <span className="text-white/70">Access conference schedules and session details</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a78bfa] font-bold text-lg">✓</span>
                  <span className="text-white/70">View speaker profiles and connect with presenters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a78bfa] font-bold text-lg">✓</span>
                  <span className="text-white/70">Register for events and access tickets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a78bfa] font-bold text-lg">✓</span>
                  <span className="text-white/70">Network with other participants and attendees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a78bfa] font-bold text-lg">✓</span>
                  <span className="text-white/70">Personalized event recommendations and updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
