"use client"

import { useState } from "react"
import { Calendar, Users, Clock, TrendingUp, Star } from "lucide-react"
import { useAdminContext } from "./AdminContext"

const DoctorPanel = () => {
  const { doctors, appointments } = useAdminContext()
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]?._id || null)
  const [auth, setAuth] = useState({ email: '', password: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const found = doctors.find(doc => doc.email === auth.email && doc.password === auth.password)
    if (found) {
      setSelectedDoctor(found._id)
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Invalid email or password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Doctor Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={auth.email}
              onChange={e => setAuth({ ...auth, email: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="doctor@clinico.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={auth.password}
              onChange={e => setAuth({ ...auth, password: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Password"
            />
          </div>
          {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
          <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-semibold">Login</button>
        </form>
      </div>
    )
  }

  const selectedDoctorData = doctors.find((doc) => doc._id === selectedDoctor)
  const doctorAppointments = appointments.filter((apt) => apt.docId === selectedDoctor)

  // Function to derive status from boolean fields
  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return "cancelled"
    if (appointment.isCompleted) return "completed"
    if (appointment.payment) return "confirmed"
    return "pending"
  }

  const doctorStats = {
    totalAppointments: doctorAppointments.length,
    confirmedAppointments: doctorAppointments.filter((apt) => apt.payment && !apt.cancelled).length,
    pendingAppointments: doctorAppointments.filter((apt) => !apt.payment && !apt.cancelled && !apt.isCompleted).length,
    completedAppointments: doctorAppointments.filter((apt) => apt.isCompleted).length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Panel</h1>
        <p className="text-gray-600">Monitor individual doctor performance and appointments</p>
      </div>

      {/* Doctor Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
        <select
          value={selectedDoctor || ""}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} - {doctor.speciality}
            </option>
          ))}
        </select>
      </div>

      {selectedDoctorData && (
        <>
          {/* Doctor Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={selectedDoctorData.image || "/placeholder.svg"}
                alt={selectedDoctorData.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedDoctorData.name}</h2>
                <p className="text-emerald-600 font-medium mb-2">{selectedDoctorData.speciality}</p>
                <p className="text-gray-600 mb-2">{selectedDoctorData.experience} experience</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{selectedDoctorData.rating || "N/A"} rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedDoctorData.patients || 0} patients</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span
                      className={`w-2 h-2 rounded-full ${selectedDoctorData.available ? "bg-green-400" : "bg-red-400"}`}
                    ></span>
                    <span>{selectedDoctorData.available ? "active" : "inactive"}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${selectedDoctorData.fees}</div>
                <div className="text-gray-600">per consultation</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{doctorStats.totalAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-gray-900">{doctorStats.confirmedAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-gray-900">{doctorStats.pendingAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-gray-900">{doctorStats.completedAppointments}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Appointments</h3>
            <div className="space-y-4">
              {doctorAppointments.slice(0, 5).map((appointment) => {
                const status = getAppointmentStatus(appointment)
                return (
                  <div key={appointment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.userData?.name}</p>
                        <p className="text-sm text-gray-600">General consultation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{appointment.slotDate}</p>
                      <p className="text-sm text-gray-600">{appointment.slotTime}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DoctorPanel
