import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { AppHeader } from '../../components/AppHeader'
import { Calendar, Mic, Users, User } from '../../components/icons/SimpleIcons'
import { ScheduleScreen } from '../schedule/ScheduleScreen'
import { SpeakersListScreen } from '../speakers/SpeakersListScreen'
import { ParticipantsScreen } from '../networking/ParticipantsScreen'
import { ProfileScreen } from '../profile/ProfileScreen'
import logo from '/logo.jpeg'

export const DashboardScreen = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [activeTab, setActiveTab] = useState('schedule')

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const tabs = [
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      component: ScheduleScreen,
    },
    {
      id: 'speakers',
      label: 'Speakers',
      icon: Mic,
      component: SpeakersListScreen,
    },
    {
      id: 'network',
      label: 'Network',
      icon: Users,
      component: ParticipantsScreen,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      component: ProfileScreen,
    },
  ]

  const activeTabObj = tabs.find((t) => t.id === activeTab)
  const ActiveComponent = activeTabObj?.component

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <AppHeader isLoggedIn={true} onLogout={handleLogout} />
      
      {/* Tab Navigation - below header */}
      <div className="sticky top-[73px] z-30 bg-[var(--brand-surface)] border-b border-[var(--brand-border)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--brand-primary)] text-white shadow-lg'
                      : 'bg-[var(--brand-surface-2)] text-[var(--brand-muted)] hover:text-[var(--brand-text)]'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  )
}
