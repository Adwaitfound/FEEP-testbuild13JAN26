import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'
import { useAuthStore } from '../../store/authStore'

const programs = [
  {
    title: "The Practitioner's Pod",
    description: "A place for practitioners of experiential education to get better at running activities",
    image: "🎯"
  },
  {
    title: "The Storytellers Playbook",
    description: "Learn to be a better storyteller and enhance your skills for lasting impact.",
    image: "📖"
  }
]

export const FeepScreen = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-tr from-[#a78bfa] to-[#6366f1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-tl from-orange-500 to-red-600 opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <AppHeader isLoggedIn={!!user} />

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-[#a78bfa] to-[#6366f1] bg-clip-text text-transparent">
              WE DREAM
            </h1>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                Imagine a world where every educator and learner is actively engaged, nourished,
                and empowered to grow, express themselves authentically, and thrive through
                meaningful experiences. Integrating experiential learning into educational spaces
                is a powerful way to turn this vision into reality.
              </p>
              <p>
                FEEP is designed as a shared space—where ideas, tools, and resources can spark
                inspiration and support anyone exploring experiential approaches in education.
                The intention is not to provide answers, but to walk together in discovery,
                learning from one another while trying new possibilities.
              </p>
              <p>
                We offer programs, and organize events to foster a supportive community,
                facilitate sharing of experiences, and grow together in this exciting journey toward
                experiential education.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-4xl font-black mb-8 text-center">
                EXPERIENTIAL EDUCATION TO SUPPORT EDUCATORS
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="text-5xl">🎓</div>
                  <h3 className="text-xl font-bold text-[#a78bfa]">Learn</h3>
                  <p className="text-white/70">
                    Discover new approaches to education through hands-on experiences
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl">🤝</div>
                  <h3 className="text-xl font-bold text-[#a78bfa]">Connect</h3>
                  <p className="text-white/70">
                    Build relationships with fellow practitioners and educators
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl">🌱</div>
                  <h3 className="text-xl font-bold text-[#a78bfa]">Grow</h3>
                  <p className="text-white/70">
                    Develop your practice and create lasting impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Programs */}
          <div className="mb-20">
            <h2 className="text-4xl font-black mb-10 text-center">Current Programs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {programs.map((program, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-[#6366f1]/50 transition-all duration-300"
                >
                  <div className="text-6xl mb-6">{program.image}</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#a78bfa]">{program.title}</h3>
                  <p className="text-white/70 leading-relaxed">{program.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About Foundation EEP */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/30 rounded-3xl p-12 backdrop-blur-sm">
              <h2 className="text-3xl font-black mb-6 text-center">About Foundation EEP</h2>
              <div className="max-w-3xl mx-auto space-y-4 text-white/80 leading-relaxed">
                <p>
                  Foundation for Experiential Education and Practices (FoundationEEP) is a non-profit 
                  organization dedicated to promoting experiential education and practices in India.
                </p>
                <p className="text-center text-sm text-white/60 mt-8">
                  Foundation for Experiential Education and Practices<br />
                  1, Gulmohar Apartments, Vardayani Society, Pashan Sus Road<br />
                  Pune - 411021<br />
                  GSTIN: 27AAFCF8936N1ZW
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-black mb-6">Join Us at the Conference</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Be part of India's premier experiential education conference. Connect with educators, 
              practitioners, and thought leaders from across the country.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate('/conference-details')}
                className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#6366f1]/50"
              >
                View Conference Details
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="font-bold mb-4 text-[#a78bfa]">Quick Links</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <button onClick={() => navigate('/')} className="block hover:text-white transition-colors">Home</button>
                  <button onClick={() => navigate('/conference-details')} className="block hover:text-white transition-colors">Conference Details</button>
                  <button onClick={() => navigate('/login')} className="block hover:text-white transition-colors">Sign In</button>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[#a78bfa]">Programs</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <p>The Practitioner's Pod</p>
                  <p>The Storytellers Playbook</p>
                  <p>Annual Conference</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[#a78bfa]">Connect</h3>
                <div className="space-y-2 text-sm text-white/60">
                  <p>Pune, Maharashtra</p>
                  <p>India</p>
                  <a 
                    href="https://www.foundationeep.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:text-white transition-colors"
                  >
                    www.foundationeep.org
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-white/40 mt-8 pt-8 border-t border-white/10">
              © 2026 Foundation for Experiential Education and Practices. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FeepScreen
