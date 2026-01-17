import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'

const CONFERENCE_DATA = {
  title: "2nd Experiential Education Conference 2026",
  dates: "31st January - 1st February 2026",
  location: "Pune, India",
  registerUrl: "https://www.foundationeep.org/buytickets",
  description: "Join us for the premier conference on experiential education and practices. Connect with educators, trainers, and professionals from around the world.",
  
  masterclasses: [
    {
      title: "Laurie Frank Masterclass",
      instructor: "Laurie Frank",
      dates: [
        { location: "Bengaluru", date: "24-25 January 2026" },
        { location: "Pune", date: "29-30 January 2026" }
      ],
      link: "https://www.foundationeep.org/masterclasslauriefrank"
    }
  ],

  highlights: [
    { icon: "🎯", title: "30+ Workshops", description: "Diverse learning opportunities across multiple streams" },
    { icon: "📊", title: "5 Conference Strands", description: "Comprehensive coverage of experiential education topics" },
    { icon: "🎓", title: "Pre-Conference Masterclass", description: "Advanced learning with industry experts" },
    { icon: "🤝", title: "Networking & Play", description: "Connect with professionals and enjoy interactive sessions" }
  ],

  strands: [
    {
      title: "Outdoor and Adventure Education",
      topics: ["Outdoor and Adventure Programs", "Education in the Outdoors", "Camping & Trekking", "Safety and Risk Management", "Adventure Program Design", "Leadership In the Outdoors", "Leave No Trace", "Sustainable Practice"]
    },
    {
      title: "Nature-Based Practices",
      topics: ["Adventure Therapy", "Environmental Education", "Wildlife and Nature Interpretation", "Sustainability and Forest Bathing"]
    },
    {
      title: "Inclusive Practices in Civil Society / Not-for-Profit",
      topics: ["Capacity Building", "Training", "Play and Gaming", "Inclusion", "Social Justice", "Sports as a Medium", "Participatory Practices"]
    },
    {
      title: "Experience-Based Training and Development",
      topics: ["Corporate Training", "Coaching and Facilitation using Play", "Gaming and Gamification", "Technology and Experiential Education", "Experience Design"]
    },
    {
      title: "K-12 Classroom Education",
      topics: ["Grade Level Curriculum", "Social & Emotional Learning (SEL)", "Curriculum Design & Development", "Teacher Leadership Training", "Play, Games and Gamification", "Technology and Experiential Education", "School Leadership and Inclusive Classrooms"]
    }
  ],

  audience: [
    "Teachers, heads & directors of schools, principals, special educators",
    "Curriculum developers, content creators & program designers",
    "Individuals & institutions involved in social emotional learning & wellbeing",
    "Trainers, coaches, facilitators - working with corporate and adult groups",
    "Professionals in civil society organisation in capacity building, training and enablement",
    "Professionals working in therapeutic spaces, inclusion and sustainability",
    "Professionals managing risk, health & safety in the outdoor",
    "Owners, leaders & managers of outdoor and adventure programs",
    "Outdoor & adventure professionals",
    "Anyone who works with groups looking to enable change"
  ],

  schedule: [
    { date: "24-25 Jan 2026", event: "Masterclass - Bengaluru", link: "/conference-schedule" },
    { date: "29-30 Jan 2026", event: "Masterclass - Pune", link: "/conference-schedule" },
    { date: "31st Jan 2026", event: "Conference Day 1", link: "/conference-schedule" },
    { date: "1st Feb 2026", event: "Conference Day 2", link: "/conference-schedule" }
  ]
}

export const ConferenceDetailsScreen = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">
          
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">{CONFERENCE_DATA.title}</h1>
            <p className="text-xl text-white/70 mb-4">{CONFERENCE_DATA.dates}</p>
            <p className="text-lg text-orange-400 font-semibold mb-8">📍 {CONFERENCE_DATA.location}</p>
            
            <button
              onClick={() => navigate('/register')}
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Register Now on FoundationEEP →
            </button>
          </div>

          {/* Highlights */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center">What's in Store</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CONFERENCE_DATA.highlights.map((highlight, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#6366f1]/50 transition-all">
                  <div className="text-4xl mb-3">{highlight.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-white/70">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Masterclass */}
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10 border border-[#6366f1]/30">
            <h2 className="text-3xl font-bold mb-6">Pre-Conference Masterclass</h2>
            {CONFERENCE_DATA.masterclasses.map((masterclass, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold mb-4">{masterclass.title}</h3>
                <p className="text-lg font-semibold mb-4 text-[#a78bfa]">Instructor: {masterclass.instructor}</p>
                <div className="space-y-3 mb-6">
                  {masterclass.dates.map((item, i) => (
                    <div key={i} className="p-4 bg-white/10 rounded-xl border border-white/10">
                      <p className="font-semibold">{item.location}</p>
                      <p className="text-white/70">{item.date}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={masterclass.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-semibold rounded-lg transition-all"
                >
                  Know More →
                </a>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Conference Schedule</h2>
            <div className="space-y-3">
              {CONFERENCE_DATA.schedule.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-orange-500/30 transition-all flex items-center justify-between">
                  <div>
                    <p className="font-bold text-orange-400">{item.date}</p>
                    <p className="text-white/70">{item.event}</p>
                  </div>
                  <a href={item.link} className="text-[#a78bfa] hover:text-[#c4b5fd]">→</a>
                </div>
              ))}
            </div>
          </div>

          {/* Conference Strands */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Conference Strands</h2>
            <div className="space-y-6">
              {CONFERENCE_DATA.strands.map((strand, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#6366f1]/50 transition-all">
                  <h3 className="text-2xl font-bold mb-4 text-[#a78bfa]">{strand.title}</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {strand.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#6366f1] mt-1">✓</span>
                        <p className="text-white/70">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Who is This Conference For?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {CONFERENCE_DATA.audience.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <span className="text-[#a78bfa] text-xl">•</span>
                  <p className="text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
              Register now for the 2nd Experiential Education Conference and connect with professionals from around the world.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="inline-block px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Register Now on FoundationEEP →
            </button>
          </div>

          {/* Footer Info */}
          <div className="text-center py-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              For more information, visit{' '}
              <a
                href="https://www.foundationeep.org/feepconference2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a78bfa] hover:text-[#c4b5fd] underline"
              >
                foundationeep.org/feepconference2026
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConferenceDetailsScreen
