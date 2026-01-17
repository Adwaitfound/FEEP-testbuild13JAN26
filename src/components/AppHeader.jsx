import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const AppHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { label: 'About Us', href: '/feep-2026' },
    { label: 'Education', href: '#education' },
    {
      label: 'Conferences',
      href: '#conferences',
      submenu: [
        { label: 'Conference 2026', href: '/feep-2026' },
        { label: 'Conference 26 Tickets', href: '/register' },
        { label: 'All Events', href: '/' }
      ]
    },
    { label: 'Resources', href: '#resources' }
  ]

  // Additional menu items for logged-in users
  const loggedInItems = [
    { label: 'Schedule', href: '/schedule' },
    { label: 'Speakers', href: '/speakers' },
    { label: 'Networking', href: '/participants' },
    { label: 'Profile', href: '/profile' }
  ]

  const allNavigationItems = isLoggedIn ? [...navigationItems.slice(0, 3), ...loggedInItems, navigationItems[3]] : navigationItems

  const handleNavClick = (item) => {
    if (item.href.startsWith('/')) {
      navigate(item.href)
      setOpenDropdown(null)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0f172a]/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3">
        {/* Single row layout */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => navigate(isLoggedIn ? '/home' : '/')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c17757] to-[#a05a3a] flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-white font-bold text-lg">📅</span>
          </div>

          {/* Desktop Navigation menu */}
          <nav className="hidden md:flex items-center gap-2 flex-nowrap">
            {allNavigationItems.map((item, idx) => (
              <div key={idx} className="relative flex-shrink-0">
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    } else {
                      handleNavClick(item)
                    }
                  }}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                    item.submenu && openDropdown === item.label
                      ? 'bg-[#f4c667] text-black'
                      : item.label === 'Conferences'
                      ? 'bg-[#f4c667] text-black'
                      : 'bg-[#c17757] text-white hover:bg-[#d4845f]'
                  }`}
                >
                  {item.label}
                </button>

                {/* Dropdown Menu */}
                {item.submenu && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl bg-[#f4c667] shadow-xl border border-[#f4c667]/50 overflow-hidden z-10">
                    {item.submenu.map((subitem, subIdx) => (
                      <button
                        key={subIdx}
                        onClick={() => handleNavClick(subitem)}
                        className="w-full px-6 py-3 text-left text-black hover:bg-[#f0ba4c] font-medium border-b border-[#e8a848] last:border-b-0 transition-colors"
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* Sign In button */}
          <button
            onClick={isLoggedIn ? onLogout : () => navigate('/login')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#c17757] to-[#a05a3a] hover:from-[#d4845f] hover:to-[#b86b47] text-white font-medium transition-all duration-300 flex-shrink-0 text-sm"
          >
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/10 pt-4">
            {allNavigationItems.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    } else {
                      handleNavClick(item)
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 text-left ${
                    item.submenu && openDropdown === item.label
                      ? 'bg-[#f4c667] text-black'
                      : item.label === 'Conferences'
                      ? 'bg-[#f4c667] text-black'
                      : 'bg-[#c17757] text-white hover:bg-[#d4845f]'
                  }`}
                >
                  {item.label}
                </button>

                {/* Mobile Dropdown Menu */}
                {item.submenu && openDropdown === item.label && (
                  <div className="mt-2 ml-4 space-y-1 border-l border-white/20 pl-3">
                    {item.submenu.map((subitem, subIdx) => (
                      <button
                        key={subIdx}
                        onClick={() => handleNavClick(subitem)}
                        className="w-full px-4 py-2 text-left text-white text-sm hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default AppHeader
