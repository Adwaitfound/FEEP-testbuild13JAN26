import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'

// Excel-friendly data structure - can be populated from CSV/Excel
const EVENTS_DATA = {
  featured: {
    id: 'feep-2026',
    title: "FEEP Conference 2026",
    subtitle: "The Future of Events & Experiences",
    date: "January 13-15, 2026",
    location: "San Francisco, CA",
    time: "9:00 AM - 6:00 PM",
    image: "🎪",
    attendees: 2500,
    speakers: 85,
    tracks: ["Technology", "Design", "Business", "Innovation"],
    description: "Join us for the most anticipated event of 2026. Connect with industry leaders, discover breakthrough ideas, and network with innovators.",
    status: "active", // active, coming-soon, ended
    registered: false,
  }
}

const UPCOMING_EVENTS = [
  { id: 1, title: "AI Summit 2026", date: "March 2026", location: "TBD", status: "coming-soon" },
  { id: 2, title: "Design Week 2026", date: "April 2026", location: "TBD", status: "coming-soon" },
  { id: 3, title: "Tech Expo 2026", date: "May 2026", location: "TBD", status: "coming-soon" },
]

const CELEBRITIES = [
  { id: 1, name: "Speaker TBA", image: "🎤", genre: "Coming Soon", status: "coming-soon" },
  { id: 2, name: "Speaker TBA", image: "🎵", genre: "Coming Soon", status: "coming-soon" },
  { id: 3, name: "Speaker TBA", image: "🎶", genre: "Coming Soon", status: "coming-soon" },
]

export const FeepScreen = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const mainEvent = EVENTS_DATA.featured

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a78bfa] to-[#6366f1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-orange-500 to-red-600 opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Sign In to FEEP</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#6366f1]/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-xl transition-all duration-300 mt-6"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-20">
        {/* Header */}
        <AppHeader 
          isLoggedIn={isLoggedIn} 
          onLogout={() => setIsLoggedIn(false)}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Featured Event - FEEP Conference */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Event Image & Info */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/30 text-[#a78bfa] text-sm font-semibold">
                    ✨ Featured Event
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
                  {mainEvent.title}
                </h1>
                <p className="text-lg text-white/70 mb-6 max-w-lg">
                  {mainEvent.description}
                </p>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-6 mb-8 w-full md:w-auto">
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Date</p>
                    <p className="text-lg font-bold">{mainEvent.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Location</p>
                    <p className="text-lg font-bold">{mainEvent.location}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 mb-8 w-full justify-center md:justify-start">
                  <div>
                    <p className="text-2xl font-black text-[#a78bfa]">{mainEvent.attendees}+</p>
                    <p className="text-xs text-white/60">Attendees</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#a78bfa]">{mainEvent.speakers}</p>
                    <p className="text-xs text-white/60">Speakers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#a78bfa]">{mainEvent.tracks.length}</p>
                    <p className="text-xs text-white/60">Tracks</p>
                  </div>
                </div>

                {/* Tracks */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                  {mainEvent.tracks.map((track, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-[#6366f1]/20 text-[#a78bfa] text-xs font-semibold">
                      {track}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {isLoggedIn ? (
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                      View Event Details →
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/signup')}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Register for FEEP 2026 →
                    </button>
                  )}
                  <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10" onClick={() => navigate('/conference-details')}>
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right: Event Hero Image */}
              <div className="relative">
                <div className="w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500/20 via-red-600/20 to-[#334155] border border-orange-500/30 flex items-center justify-center text-9xl">
                  {mainEvent.image}
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Coming Soon Events */}
          <div>
            <h2 className="text-4xl font-bold mb-8">What's Coming Next</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {UPCOMING_EVENTS.map(event => (
                <ComingSoonCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Coming Soon Speakers */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8">Featured Speakers (Coming Soon)</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {CELEBRITIES.map(celeb => (
                <div key={celeb.id} className="flex-shrink-0 text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center text-5xl opacity-50 mb-3">
                    {celeb.image}
                  </div>
                  <p className="text-sm font-semibold">{celeb.name}</p>
                  <p className="text-xs text-white/50">{celeb.genre}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/10 mt-20">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">FEEP</h4>
              <p className="text-white/60 text-sm">The premier event platform for discovering and attending world-class conferences.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Event</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">Schedule</a></li>
                <li><a href="#" className="hover:text-white transition">Speakers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>&copy; 2026 FEEP Conference. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

const ComingSoonCard = ({ event }) => (
  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 text-center opacity-60 hover:opacity-80 transition-opacity">
    <div className="text-5xl mb-4">🔜</div>
    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
    <p className="text-sm text-white/60 mb-3">{event.date}</p>
    <p className="text-xs text-white/50">{event.location}</p>
    <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white/70">
      Coming Soon
    </div>
  </div>
)

export default FeepScreen
