"use client"

import axios from "axios"
import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])


  // Check for existing token on mount
  useEffect(() => {


       const fetchData= async()=>{
      // Updated doctors data to match doctorSchema with availableDays added
   
      try {
        const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/admin/all-doctors") 
  setDoctors(data.doctors)
 
  // Updated appointments data to match appointmentSchema
   
  const { data:appointmentData } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/admin/all-appointments") 
  setAppointments(appointmentData.appointments)
      } catch (error) {
         console.error('Error fetching data:', error);
      }
  
    }

    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token")
      const savedUser = localStorage.getItem("user")
      if (savedToken && savedUser) {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      }
      
       fetchData();
    }

   
  }, [])

 
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      _id: Date.now().toString(),
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  const updateAppointmentStatus = (id, updates) => {
    setAppointments((prev) => prev.map((apt) => (apt._id === id ? { ...apt, ...updates } : apt)))
  }

  const setTokenSafe = (newToken) => {
    setToken(newToken)
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("token", newToken)
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
      }
    }
  }

  const setUserSafe = (newUser) => {
    setUser(newUser)
    if (typeof window !== "undefined" && newUser) {
      localStorage.setItem("user", JSON.stringify(newUser))
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }

  const value = {
    token,
    setToken: setTokenSafe,
    user,
    setUser: setUserSafe,
    logout,
    doctors,
    appointments,
    addAppointment,
    updateAppointmentStatus,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
