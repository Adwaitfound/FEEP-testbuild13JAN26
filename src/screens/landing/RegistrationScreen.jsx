import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../../components/AppHeader'

const REGISTRATION_DATA = {
  conferenceTicket: {
    title: "2nd Experiential Education Conference",
    dates: "31st Jan - 1st Feb 2026",
    location: "Pune, India",
    venue: "Sandipani Hometel, Symbiosis International University Hilltop Campus, Lavale, Maharashtra 412115",
    price: "Rs. 8,500 + 18% GST",
    includes: ["Lunch", "Tea", "Conference Materials", "Access to all sessions"],
    paymentLink: "https://forms.easebuzz.in/register/FOUNDATIONXhjin/CONFReg",
    accommodation: "https://www.sandipanihometel.com/"
  },

  masterclasses: [
    {
      instructor: "Laurie Frank",
      courses: [
        {
          title: "Creating a Sense of Community with Intention",
          description: "We live in times where people feel less connected and even isolated. Creating a sense of community at home, work, in our classrooms, boardrooms, and neighborhoods can bridge the divides; but what does that really mean? Participating in activities, and simply being together can help, but may lack the necessary depth.",
          price: "Rs. 6,500 + 18% GST",
          includes: ["Lunch", "Tea"],
          sessions: [
            { location: "Bengaluru (BLR1)", date: "24 Jan 2026", status: "available" },
            { location: "Pune (PNA3)", date: "29 Jan 2026", status: "available" }
          ]
        },
        {
          title: "Thinking Experientially",
          description: "Being an experiential educator requires one to think and plan experientially in order to design learning processes rather than isolated learning events. This workshop will provide an overview of brain research and its connection to experiential education in its many forms.",
          price: "Rs. 6,500 + 18% GST",
          includes: ["Lunch", "Tea"],
          sessions: [
            { location: "Bengaluru (BLR2)", date: "25 Jan 2026", status: "available" }
          ]
        }
      ]
    },
    {
      instructor: "Mark Collard",
      courses: [
        {
          title: "Remarkable Program Design",
          description: "Programs that intentionally develop trusting relationships outperform all others - driving greater participation, stronger team cohesion, and measurably better outcomes. Yet most group leaders, facilitators and trainers struggle to design experiences that create genuine connection without sacrificing learning objectives or wasting precious time.",
          price: "Rs. 6,500 + 18% GST",
          includes: ["Lunch", "Tea"],
          sessions: [
            { location: "Bengaluru (BLR1)", date: "24 Jan 2026", status: "available" },
            { location: "Pune (PNA3)", date: "29 Jan 2026", status: "sold-out" }
          ]
        },
        {
          title: "Critical Facilitation Skills",
          description: "Running great activities is one thing. Facilitating transformation is another. Many group leaders struggle to create genuine engagement - and even those who do often can't translate that energy into lasting insight, behavioural change, and group growth.",
          price: "Rs. 6,500 + 18% GST",
          includes: ["Lunch", "Tea"],
          sessions: [
            { location: "Bengaluru (BLR2)", date: "25 Jan 2026", status: "available" },
            { location: "Pune (PNA4)", date: "30 Jan 2026", status: "sold-out" }
          ]
        }
      ]
    }
  ],

  venues: {
    bengaluru: {
      name: "Quest Alliance",
      address: "Quest Learning Observatory 222, Good Earth Malhar Ave, Anchepalya, Bengaluru, Kambipura, Karnataka 560074",
      mapLink: "https://maps.app.goo.gl/FoC3Qhi37TxWKWAz5"
    },
    pune: {
      name: "Sandipani Hometel",
      address: "Symbiosis International University, Hilltop Campus, Lavale, Maharashtra 412115",
      mapLink: "https://maps.app.goo.gl/cHLUXNFTaQqH4NPQ6"
    }
  }
}

export const RegistrationScreen = () => {
  const navigate = useNavigate()
  const [selectedMasterclass, setSelectedMasterclass] = useState(null)
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
          
          {/* Conference Ticket */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-2">{REGISTRATION_DATA.conferenceTicket.title}</h1>
            <p className="text-orange-400 font-semibold mb-8">{REGISTRATION_DATA.conferenceTicket.dates}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Details */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                  <h3 className="text-2xl font-bold mb-4">Conference Ticket</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-white/60 text-sm uppercase mb-1">Location</p>
                      <p className="font-semibold">{REGISTRATION_DATA.conferenceTicket.venue}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase mb-1">Price</p>
                      <p className="text-3xl font-black text-orange-400">{REGISTRATION_DATA.conferenceTicket.price}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm uppercase mb-2">Includes</p>
                      <ul className="space-y-1">
                        {REGISTRATION_DATA.conferenceTicket.includes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-[#6366f1]">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={REGISTRATION_DATA.conferenceTicket.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 text-center mb-3"
                  >
                    Register via Easebuzz →
                  </a>

                  <button
                    onClick={() => navigate('/login')}
                    className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 text-center text-sm"
                  >
                    I have already registered
                  </button>

                  <a
                    href={REGISTRATION_DATA.conferenceTicket.accommodation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 text-center text-sm"
                  >
                    Book Accommodation
                  </a>
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-xl bg-[#6366f1]/20 border border-[#6366f1]/30">
                  <p className="text-sm text-white/70">
                    <strong>Note:</strong> Accommodation details will be shared with registered participants in due course.
                  </p>
                </div>
              </div>

              {/* Right: Venue Info */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/10 border border-[#6366f1]/30">
                  <h3 className="text-2xl font-bold mb-4">Venue Information</h3>
                  
                  <div className="space-y-6">
                    {/* Pune Venue */}
                    <div>
                      <p className="text-[#a78bfa] font-bold mb-2">📍 Pune (Conference)</p>
                      <p className="font-semibold mb-2">{REGISTRATION_DATA.venues.pune.name}</p>
                      <p className="text-white/70 text-sm mb-3">{REGISTRATION_DATA.venues.pune.address}</p>
                      <a
                        href={REGISTRATION_DATA.venues.pune.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a78bfa] hover:text-[#c4b5fd] text-sm font-semibold"
                      >
                        View on Map →
                      </a>
                    </div>

                    {/* Bengaluru Venue */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[#a78bfa] font-bold mb-2">📍 Bengaluru (Masterclass)</p>
                      <p className="font-semibold mb-2">{REGISTRATION_DATA.venues.bengaluru.name}</p>
                      <p className="text-white/70 text-sm mb-3">{REGISTRATION_DATA.venues.bengaluru.address}</p>
                      <a
                        href={REGISTRATION_DATA.venues.bengaluru.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a78bfa] hover:text-[#c4b5fd] text-sm font-semibold"
                      >
                        View on Map →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Masterclasses */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Pre-Conference Masterclasses</h2>
            
            <div className="space-y-12">
              {REGISTRATION_DATA.masterclasses.map((instructor, instIdx) => (
                <div key={instIdx}>
                  <h3 className="text-2xl font-bold mb-6 text-[#a78bfa]">with {instructor.instructor}</h3>
                  
                  <div className="space-y-6">
                    {instructor.courses.map((course, courseIdx) => (
                      <div key={courseIdx} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#6366f1]/50 transition-all">
                        <h4 className="text-xl font-bold mb-3">{course.title}</h4>
                        <p className="text-white/70 mb-4">{course.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-white/60 text-sm uppercase mb-1">Price</p>
                            <p className="text-2xl font-black text-orange-400">{course.price}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm uppercase mb-1">Includes</p>
                            <p className="font-semibold">{course.includes.join(", ")}</p>
                          </div>
                        </div>

                        {/* Sessions */}
                        <div className="mb-4">
                          <p className="text-white/60 text-sm uppercase mb-2">Available Sessions</p>
                          <div className="space-y-2">
                            {course.sessions.map((session, sessionIdx) => (
                              <div key={sessionIdx} className={`p-3 rounded-lg border ${
                                session.status === 'sold-out'
                                  ? 'bg-white/5 border-white/10 opacity-60'
                                  : 'bg-gradient-to-r from-orange-500/20 to-red-600/20 border-orange-500/30'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-semibold">{session.location}</p>
                                    <p className="text-white/60 text-sm">{session.date}</p>
                                  </div>
                                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                    session.status === 'sold-out'
                                      ? 'bg-white/10 text-white/50'
                                      : 'bg-green-500/20 text-green-400'
                                  }`}>
                                    {session.status === 'sold-out' ? 'SOLD OUT' : 'AVAILABLE'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {course.sessions.some(s => s.status === 'available') && (
                          <a
                            href={REGISTRATION_DATA.conferenceTicket.paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-semibold rounded-lg transition-all text-sm"
                          >
                            Register for Masterclass →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "What is included in the conference ticket?",
                  a: "The conference ticket includes access to all sessions, lunch, tea, and conference materials for both days (31st Jan - 1st Feb 2026)."
                },
                {
                  q: "Do I need to register for masterclasses separately?",
                  a: "Yes, masterclasses are separate from the main conference and require individual registration. They are held on 24-25 January (Bengaluru) and 29-30 January (Pune)."
                },
                {
                  q: "How do I book accommodation?",
                  a: "Accommodation details and booking links will be shared with registered conference participants. You can also visit Sandipani Hometel website directly."
                },
                {
                  q: "What is the payment method?",
                  a: "Payment is processed through Easebuzz, a secure online payment gateway. You'll be redirected to complete your registration and payment."
                },
                {
                  q: "Are there early bird discounts?",
                  a: "Early bird prices were valid till 30 November 2025. Current pricing is the standard rate."
                }
              ].map((item, idx) => (
                <details key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    {item.q}
                    <span className="group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-white/70">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/10 border border-[#6366f1]/30 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-white/70 mb-6">
              For more information or questions about registration, visit the official conference website.
            </p>
            <a
              href="https://www.foundationeep.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-bold rounded-lg transition-all"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationScreen
