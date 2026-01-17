import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import logo from '/logo.jpeg'

export const LoginScreen = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const requestPasswordReset = useAuthStore((state) => state.requestPasswordReset)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [resetting, setResetting] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/home')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    if (!email) {
      setError('Enter your registered email to reset the password')
      return
    }
    setError('')
    setResetMessage('')
    setResetting(true)
    try {
      await requestPasswordReset(email)
      setResetMessage('Check your email for a password reset link.')
    } catch (err) {
      setError(err.message || 'Could not send reset email')
    } finally {
      setResetting(false)
    }
  }

  const benefits = [
    'Access conference schedules and session details',
    'View speaker profiles and connect with presenters',
    'Register for events and access tickets',
    'Network with other participants and attendees',
    'Personalized event recommendations and updates'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a78bfa] to-[#6366f1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-orange-500 to-red-600 opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <div className="relative z-10 pt-6 pb-4 px-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition-colors text-sm font-medium"
          >
            ← Back to Home
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/feep-2026')}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              About FEEP
            </button>
            <button
              onClick={() => navigate('/conference-details')}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              Conference Details
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-10 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <img src={logo} alt="FEEP Logo" className="h-20 w-auto mx-auto mb-6 rounded-lg" />
          <h1 className="text-4xl md:text-5xl font-black mb-2">Welcome Back!</h1>
          <p className="text-white/70">Sign in to register for conferences</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Login Form */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    {error}
                  </div>
                )}
                {resetMessage && (
                  <div className="text-green-400 text-sm p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    {resetMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="text-center pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={resetting}
                    className="text-[#a78bfa] hover:text-[#ddd6fe] font-semibold text-sm transition-colors"
                  >
                    {resetting ? 'Sending reset link...' : 'I already registered — send me a reset link'}
                  </button>
                </div>
              </form>
            </div>

            {/* Signup CTA */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <p className="text-center mb-4 text-white/70">Don't have an account?</p>
                <button
                  onClick={() => navigate('/auth/register')}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all duration-300 mb-4"
                >
                  Create New Account
                </button>
                <p className="text-center text-xs text-white/50">Click 'Create New Account' above</p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-black mb-6">Benefits of Having an Account:</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[#f4c667] text-xl mt-1">✓</span>
                  <span className="text-white/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
