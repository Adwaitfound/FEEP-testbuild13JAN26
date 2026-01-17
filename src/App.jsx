import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { PrivateRoute, PublicRoute } from './utils/routeGuards'
import { Layout } from './components/Layout'
import { LoginScreen } from './screens/auth/LoginScreen'
import { RegisterScreen } from './screens/auth/RegisterScreen'
import { ProfileSetupScreen } from './screens/auth/ProfileSetupScreen'
import { ScheduleScreen } from './screens/schedule/ScheduleScreen'
import { ProfileScreen } from './screens/profile/ProfileScreen'
import { SpeakersListScreen } from './screens/speakers/SpeakersListScreen'
import { EventInfoScreen } from './screens/info/EventInfoScreen'
import { ParticipantsScreen } from './screens/networking/ParticipantsScreen'
import { HomeScreen } from './screens/home/HomeScreen'
import AllEventsScreen from './screens/landing/AllEventsScreen'
import FeepScreen from './screens/landing/FeepScreen'
import SignupGatewayScreen from './screens/landing/SignupGatewayScreen'
import { ConferenceDetailsScreen } from './screens/landing/ConferenceDetailsScreen'
import { RegistrationScreen } from './screens/landing/RegistrationScreen'

const HomeScreenWrapper = () => (
  <Layout>
    <HomeScreen />
  </Layout>
)

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <AllEventsScreen />
            }
          />
          <Route
            path="/feep-2026"
            element={
              <FeepScreen />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupGatewayScreen />
            }
          />
          <Route
            path="/conference-details"
            element={
              <ConferenceDetailsScreen />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationScreen />
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
            path="/register"
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

          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeScreenWrapper />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <Layout>
                  <ScheduleScreen />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/speakers"
            element={
              <PrivateRoute>
                <Layout>
                  <SpeakersListScreen />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/networking"
            element={
              <PrivateRoute>
                <Layout>
                  <ParticipantsScreen />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/event-info"
            element={
              <PrivateRoute>
                <Layout>
                  <EventInfoScreen />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <ProfileScreen />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppProvider>
    </Router>
  )
}

export default App
