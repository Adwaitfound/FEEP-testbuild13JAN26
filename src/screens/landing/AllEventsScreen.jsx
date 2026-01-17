import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'

const ALL_EVENTS = [
  {
    id: 'feep-2026',
    title: "FEEP Conference 2026",
    subtitle: "2nd Experiential Education Conference",
    date: "Jan 31 - Feb 1, 2026",
    location: "Pune, India",
    image: "🎓",
    attendees: 2500,
    speakers: 85,
    tracks: 5,
    status: 'upcoming',
    featured: true,
    route: '/feep-2026'
  },
  {
    id: 'ai-summit',
    title: "AI Summit 2026",
    subtitle: "The Future of Artificial Intelligence",
    date: "March 15-17, 2026",
    location: "Bangalore, India",
    image: "🤖",
    attendees: 1800,
    speakers: 60,
    tracks: 4,
    status: 'coming-soon',
    featured: false,
    route: null
  },
  {
    id: 'design-week',
    title: "Design Week 2026",
    subtitle: "Innovation in Design & UX",
    date: "April 5-9, 2026",
    location: "Mumbai, India",
    image: "🎨",
    attendees: 1200,
    speakers: 45,
    tracks: 3,
    status: 'coming-soon',
    featured: false,
    route: null
  },
  {
    id: 'tech-expo',
    title: "Tech Expo 2026",
    subtitle: "Latest in Technology & Innovation",
    date: "May 10-12, 2026",
    location: "Delhi, India",
    image: "💻",
    attendees: 2000,
    speakers: 70,
    tracks: 5,
    status: 'coming-soon',
    featured: false,
    route: null
  }
]

export default function AllEventsScreen() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const featuredEvent = ALL_EVENTS.find(e => e.featured)
  const otherEvents = ALL_EVENTS.filter(e => !e.featured)

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
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          
          {/* Hero Banner Image */}
          <div className="mb-20 rounded-3xl overflow-hidden border border-[#6366f1]/30 h-96 md:h-[500px] relative group">
            <img 
              src="https://static.wixstatic.com/media/7fe594_cb2d1d484d3846e18146fdde90a3e982~mv2.jpg/v1/crop/x_101,y_0,w_2198,h_1600/fill/w_992,h_722,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Day%203%20P%203%20(108).jpg"
              alt="Experiential Education"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          
          {/* Page Header */}
          <div className="mb-20">
            <div className="mb-12 text-center">
              <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
                Experiential Education
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                Experiential education is a philosophy and methodology that uses direct experience as the primary means of learning. It goes beyond traditional classroom teaching to engage learners in real-world activities, reflection, and application of knowledge.
              </p>
            </div>

            {/* Key Principles Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10 border border-[#6366f1]/30">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3">Learning by Doing</h3>
                <p className="text-white/70">Active participation and hands-on experience form the foundation of deep learning, creating meaningful connections to real-world applications.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#a78bfa]/10 border border-[#8b5cf6]/30">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold mb-3">Reflection & Growth</h3>
                <p className="text-white/70">Through structured reflection, learners process experiences, develop critical thinking skills, and build personal insights for continuous growth.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#a78bfa]/20 to-[#6366f1]/10 border border-[#a78bfa]/30">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold mb-3">Real-World Application</h3>
                <p className="text-white/70">Knowledge gained through experience is immediately applicable to real-world situations, creating practical and lasting impact.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#c17757]/20 to-[#a05a3a]/10 border border-[#c17757]/30">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold mb-3">Collaborative Learning</h3>
                <p className="text-white/70">Experiential education emphasizes teamwork, communication, and shared learning experiences that develop social and emotional skills.</p>
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/30 text-center">
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                From outdoor education and adventure programs to classroom-based experiential learning, our conferences bring together educators, trainers, and practitioners to share innovative approaches, best practices, and transformative experiences that shape the future of education.
              </p>
            </div>
          </div>

          {/* Conferences Section Header */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Conferences & Events</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Join our community of educators and professionals dedicated to advancing experiential education through learning, collaboration, and innovation
            </p>
          </div>
          
          {/* Page Header */}
          {featuredEvent && (
            <div className="mb-20">
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10" />
                <div className="relative p-8 md:p-16 border border-[#6366f1]/30">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Details */}
                    <div>
                      <div className="inline-block px-4 py-2 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/30 mb-6">
                        <span className="text-[#a78bfa] font-semibold text-sm">FEATURED EVENT</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black mb-2">{featuredEvent.title}</h2>
                      <p className="text-lg text-white/70 mb-6">{featuredEvent.subtitle}</p>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{featuredEvent.image}</span>
                          <div>
                            <p className="text-white/60 text-sm">Location</p>
                            <p className="font-semibold">{featuredEvent.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📅</span>
                          <div>
                            <p className="text-white/60 text-sm">Date</p>
                            <p className="font-semibold">{featuredEvent.date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-center">
                          <p className="text-white/60 text-sm">Attendees</p>
                          <p className="text-2xl font-bold text-[#a78bfa]">{featuredEvent.attendees.toLocaleString()}+</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-sm">Speakers</p>
                          <p className="text-2xl font-bold text-[#a78bfa]">{featuredEvent.speakers}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60 text-sm">Tracks</p>
                          <p className="text-2xl font-bold text-[#a78bfa]">{featuredEvent.tracks}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => navigate(featuredEvent.route)}
                          className="flex-1 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Learn More
                        </button>
                        <button
                          onClick={() => navigate('/signup')}
                          className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className="text-9xl animate-bounce">{featuredEvent.image}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Events Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8">Upcoming Events</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  {/* Card Header */}
                  <div className="p-6 bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border-b border-white/10">
                    <div className="text-5xl mb-4">{event.image}</div>
                    <h4 className="text-xl font-bold">{event.title}</h4>
                    <p className="text-sm text-white/60 mt-2">{event.subtitle}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-white/70">
                        <span>📅</span>
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <span>📍</span>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <p className="text-xs text-white/60">Attendees</p>
                        <p className="font-bold text-[#a78bfa]">{event.attendees}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Speakers</p>
                        <p className="font-bold text-[#a78bfa]">{event.speakers}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Tracks</p>
                        <p className="font-bold text-[#a78bfa]">{event.tracks}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 border-t border-white/10 bg-white/5">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-semibold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/30 text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Don't miss out on our upcoming events. Subscribe to get notified about new conferences, early bird discounts, and exclusive content.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-semibold rounded-lg transition-all duration-300">
              Subscribe to Updates
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-lg mb-4">About</h4>
                <p className="text-white/60 text-sm">Foundation EEP is dedicated to advancing experiential education through conferences and learning experiences.</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-white/60">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Contact</h4>
                <p className="text-white/60 text-sm">Email: info@foundationeep.org</p>
                <p className="text-white/60 text-sm">Phone: +91 (0) XXXX XXXX</p>
              </div>
            </div>
            <div className="text-center text-white/40 text-sm pt-8 border-t border-white/10">
              <p>© 2026 Foundation EEP. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
