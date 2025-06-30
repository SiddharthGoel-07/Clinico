"use client"

import { createContext, useContext, useState } from "react"
import { useAppContext } from "../context/AppContext"

const AdminContext = createContext()

export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdminContext must be used within AdminProvider")
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken") || null
    }
    return null
  })
  const [adminUser, setAdminUser] = useState({ name: "Admin User", email: "admin@clinico.com" })

  // Updated doctors data to match doctorSchema with availableDays added
 const { doctors, setDoctors } = useAppContext()

  // Updated appointments data to match appointmentSchema
  const { appointments, setAppointments } = useAppContext()

  const addDoctor = async (doctor) => {
    const newDoctor = {
      ...doctor,
      _id: Date.now().toString(),
      date: Date.now(),
      slots_booked: {},
      patients: 0,
      available: true,
      availableDays: doctor.availableDays || [],
    }
    setDoctors((prev) => [...prev, newDoctor])

    const {data} =await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/admin/add-doctor", newDoctor);
  }

  const updateAppointmentStatus = (id, updates) => {
    setAppointments((prev) => prev.map((apt) => (apt._id === id ? { ...apt, ...updates } : apt)))
  }

  const getStats = () => ({
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter((apt) => !apt.cancelled && apt.payment).length,
    pendingAppointments: appointments.filter((apt) => !apt.cancelled && !apt.payment).length,
  })

  const setAdminTokenSafe = (newToken) => {
    setAdminToken(newToken)
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("adminToken", newToken)
      } else {
        localStorage.removeItem("adminToken")
      }
    }
  }

  const value = {
    adminToken,
    setAdminToken: setAdminTokenSafe,
    adminUser,
    setAdminUser,
    doctors,
    setDoctors,
    appointments,
    setAppointments,
    addDoctor,
    updateAppointmentStatus,
    getStats,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
