"use client"

import { useState } from "react"
import { Calendar, Clock, Phone, MapPin, Filter, Search } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const MyAppointments = () => {
  const { appointments, doctors, updateAppointmentStatus, user } = useAppContext()
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getDoctor = (doctorId) => {
    return doctors.find((doc) => doc._id === doctorId)
  }

  // Function to derive status from boolean fields
  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return "cancelled"
    if (appointment.isCompleted) return "completed"
    if (appointment.payment) return "confirmed"
    return "pending"
  }

  // Only show appointments for the logged-in user
  const myAppointments = user
    ? appointments.filter((appointment) => appointment.userId === user._id)
    : [];

  const filteredAppointments = myAppointments.filter((appointment) => {
    const doctor = getDoctor(appointment.docId);
    const status = getAppointmentStatus(appointment);
    const matchesSearch =
      doctor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.userData?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  const handleStatusChange = (appointmentId, newStatus) => {
    const updates = {}
    switch (newStatus) {
      case "confirmed":
        updates.payment = true
        updates.cancelled = false
        updates.isCompleted = false
        break
      case "cancelled":
        updates.cancelled = true
        updates.payment = false
        updates.isCompleted = false
        break
      case "completed":
        updates.isCompleted = true
        updates.cancelled = false
        updates.payment = true
        break
      default:
        updates.payment = false
        updates.cancelled = false
        updates.isCompleted = false
    }
    updateAppointmentStatus(appointmentId, updates)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-xl text-gray-600">Manage and track all your medical appointments</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
              Export
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">You don't have any appointments matching your criteria.</p>
              <a
                href="/doctors"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                Book New Appointment
              </a>
            </div>
          ) : (
            filteredAppointments.map((appointment) => {
              const doctor = getDoctor(appointment.docId)
              const status = getAppointmentStatus(appointment)
              return (
                <div
                  key={appointment._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                        <img
                          src={doctor?.image || "/placeholder.svg?height=80&width=80"}
                          alt={doctor?.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor?.name}</h3>
                          <p className="text-emerald-600 font-medium mb-2">{doctor?.specialty}</p>
                          <p className="text-gray-600 mb-2">{appointment.userData?.name}</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="lg:text-right space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.slotDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.slotTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>Clinic Visit</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-3">
                        {status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(appointment._id, "confirmed")}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment._id, "cancelled")}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {status === "confirmed" && (
                          <>
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleStatusChange(appointment._id, "cancelled")}
                              className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-medium"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Contact Doctor</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{appointments.length}</div>
            <div className="text-gray-600">Total Appointments</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {appointments.filter((apt) => apt.payment && !apt.cancelled).length}
            </div>
            <div className="text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {appointments.filter((apt) => !apt.payment && !apt.cancelled && !apt.isCompleted).length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {appointments.filter((apt) => apt.isCompleted).length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
