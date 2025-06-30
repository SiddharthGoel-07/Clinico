"use client"

import { useState } from "react"
import { AppProvider } from "./context/AppContext"
import { AdminProvider } from "./admin/AdminContext"
import { ToastContainer } from 'react-toastify';
import Layout from "./components/Layout"
import AdminLayout from "./admin/AdminLayout"
import AdminLogin from "./admin/AdminLogin"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import all pages
import Home from "./pages/Home"
import AllDoctors from "./pages/AllDoctors"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyAppointments from "./pages/MyAppointments"
import AppointmentBooking from "./pages/AppointmentBooking"
import LoginSignup from "./pages/LoginSignup"
import MyProfile from "./pages/MyProfile"

// Import admin pages
import Dashboard from "./admin/Dashboard"
import AdminAllAppointments from "./admin/AllAppointments"
import DoctorPanel from "./admin/DoctorPanel"
import AddDoctor from "./admin/AddDoctor"
import AdminAllDoctors from "./admin/AllDoctors"

const App = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  const navigate = useNavigate();

  const handleAdminClick = () => {
    setShowAdminLogin(true)
  }

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true)
    setShowAdminLogin(false)
    navigate('/admin/dashboard')
  }

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false)
    navigate('/')
  }

    let content;

  if (showAdminLogin && !isAdminAuthenticated) {
    content = (
      <AppProvider>
        <AdminProvider>
        <AdminLogin onLogin={handleAdminLogin} />
      </AdminProvider>
      </AppProvider>
    )
  }
  else
  {
  content = (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={
          <AppProvider>
            <Layout navigate={navigate} onAdminClick={handleAdminClick}>
              <Home navigate={navigate} />
            </Layout>
          </AppProvider>
        } />
        <Route path="/doctors" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><AllDoctors navigate={navigate} /></Layout></AppProvider>} />
        <Route path="/about" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><About /></Layout></AppProvider>} />
        <Route path="/contact" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><Contact /></Layout></AppProvider>} />
        <Route path="/my-appointments" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><MyAppointments /></Layout></AppProvider>} />
        <Route path="/booking" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><AppointmentBooking navigate={navigate} /></Layout></AppProvider>} />
        <Route path="/login" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><LoginSignup navigate={navigate} /></Layout></AppProvider>} />
        <Route path="/profile" element={<AppProvider><Layout navigate={navigate} onAdminClick={handleAdminClick}><MyProfile /></Layout></AppProvider>} />

        {/* Admin routes - protected */}
        <Route path="/admin/*" element={
          isAdminAuthenticated ? (
            <AppProvider>
            <AdminProvider>
              <AdminLayout onLogout={handleAdminLogout} currentRoute={null} onNavigate={null}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="appointments" element={<AdminAllAppointments />} />
                  <Route path="doctor-panel" element={<DoctorPanel />} />
                  <Route path="add-doctor" element={<AddDoctor />} />
                  <Route path="doctors" element={<AdminAllDoctors />} />
                  <Route path="*" element={<Navigate to="dashboard" />} />
                </Routes>
              </AdminLayout>
            </AdminProvider>
            </AppProvider>
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </>
    
  )
}

return (
  <AppProvider>
    {content}
  </AppProvider>
);
}

export default App
