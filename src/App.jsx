import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { PrivateRoute, PublicRoute } from './utils/routeGuards'
import { LoginScreen } from './screens/auth/LoginScreen'
import { RegisterScreen } from './screens/auth/RegisterScreen'
import { ProfileSetupScreen } from './screens/auth/ProfileSetupScreen'
import { DashboardScreen } from './screens/home/DashboardScreen'
import { ScheduleScreen } from './screens/schedule/ScheduleScreen'
import { ProfileScreen } from './screens/profile/ProfileScreen'
import { SpeakersListScreen } from './screens/speakers/SpeakersListScreen'
import { EventInfoScreen } from './screens/info/EventInfoScreen'
import { ParticipantsScreen } from './screens/networking/ParticipantsScreen'
import AllEventsScreen from './screens/landing/AllEventsScreen'
import FeepScreen from './screens/landing/FeepScreen'
import SignupGatewayScreen from './screens/landing/SignupGatewayScreen'
import { ConferenceDetailsScreen } from './screens/landing/ConferenceDetailsScreen'
import { RegistrationScreen } from './screens/landing/RegistrationScreen'

const DashboardWrapper = () => <DashboardScreen />

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <Routes>
          {/* Landing page - root for unauthenticated users */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <AllEventsScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/feep-2026"
            element={
              <PublicRoute>
                <FeepScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupGatewayScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/conference-details"
            element={
              <PublicRoute>
                <ConferenceDetailsScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <RegisterScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/profile-setup"
            element={
              <PrivateRoute>
                <ProfileSetupScreen />
              </PrivateRoute>
            }
          />

          {/* Private Routes - Main Dashboard */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <DashboardWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <ScheduleScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/speakers"
            element={
              <PrivateRoute>
                <SpeakersListScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/participants"
            element={
              <PrivateRoute>
                <ParticipantsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/networking"
            element={
              <PrivateRoute>
                <ParticipantsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/event-info"
            element={
              <PrivateRoute>
                <EventInfoScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            }
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}

export default App
