import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import StudentSignup from './pages/StudentSignup';
import SponsorSignup from './pages/SponsorSignup';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import ScholarshipApplication from './pages/student/ScholarshipApplication';
import StudentApplications from './pages/student/StudentApplications';
import Wallet from './pages/student/Wallet';
import StudentVerification from './components/StudentVerification';
import SponsorDashboard from './pages/sponsor/SponsorDashboard';
import SponsorProfile from './pages/sponsor/SponsorProfile';
import CreateScholarship from './pages/sponsor/CreateScholarship';
import ManageScholarships from './pages/sponsor/ManageScholarships';
import ApplicationsManagement from './pages/sponsor/ApplicationsManagement';
import PaymentPage from './pages/sponsor/PaymentPage';
import PaymentHistory from './pages/sponsor/PaymentHistory';
import LandingPage from './pages/LandingPage';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard imports
import NGODashboard from './pages/dashboards/NGODashboard';
import StudentProgressView from './pages/dashboards/StudentProgressView';
import AdminView from './pages/dashboards/AdminView';

// Institutional Partnership imports
import CollegePortal from './pages/institutional/CollegePortal';
import CSRPortal from './pages/institutional/CSRPortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/sponsor/signup" element={<SponsorSignup />} />
            
            {/* Protected Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute requiredRole="student">
                <StudentProfile />
              </ProtectedRoute>
            } />
            <Route path="/student/applications" element={
              <ProtectedRoute requiredRole="student">
                <StudentApplications />
              </ProtectedRoute>
            } />
            <Route path="/student/apply/:id" element={
              <ProtectedRoute requiredRole="student">
                <ScholarshipApplication />
              </ProtectedRoute>
            } />
            <Route path="/student/wallet" element={
              <ProtectedRoute requiredRole="student">
                <Wallet />
              </ProtectedRoute>
            } />
            <Route path="/student/verification" element={
              <ProtectedRoute requiredRole="student">
                <StudentVerification />
              </ProtectedRoute>
            } />
            
            {/* Protected Sponsor Routes */}
            <Route path="/sponsor/dashboard" element={
              <ProtectedRoute requiredRole="sponsor">
                <SponsorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/profile" element={
              <ProtectedRoute requiredRole="sponsor">
                <SponsorProfile />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/create" element={
              <ProtectedRoute requiredRole="sponsor">
                <CreateScholarship />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/scholarships" element={
              <ProtectedRoute requiredRole="sponsor">
                <ManageScholarships />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/applications/:id" element={
              <ProtectedRoute requiredRole="sponsor">
                <ApplicationsManagement />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/payment/:scholarshipId" element={
              <ProtectedRoute requiredRole="sponsor">
                <PaymentPage />
              </ProtectedRoute>
            } />
            <Route path="/sponsor/payments" element={
              <ProtectedRoute requiredRole="sponsor">
                <PaymentHistory />
              </ProtectedRoute>
            } />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboards/ngo" element={
              <ProtectedRoute>
                <NGODashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboards/student-progress" element={
              <ProtectedRoute>
                <StudentProgressView />
              </ProtectedRoute>
            } />
            <Route path="/dashboards/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminView />
              </ProtectedRoute>
            } />
            
            {/* Protected Institutional Partnership Routes */}
            <Route path="/institutional/college" element={
              <ProtectedRoute>
                <CollegePortal />
              </ProtectedRoute>
            } />
            <Route path="/institutional/csr" element={
              <ProtectedRoute>
                <CSRPortal />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;