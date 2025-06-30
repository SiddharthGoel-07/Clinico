"use client"
import { Users, Calendar, Stethoscope, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useAdminContext } from "./AdminContext"
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { getStats, appointments, doctors } = useAdminContext()
  const stats = getStats()

  // Function to derive status from boolean fields
  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return "cancelled"
    if (appointment.isCompleted) return "completed"
    if (appointment.payment) return "confirmed"
    return "pending"
  }

  const recentAppointments = appointments.slice(0, 5)

  const statusIcons = {
    confirmed: CheckCircle,
    pending: Clock,
    cancelled: XCircle,
    completed: CheckCircle,
  }

  const statusColors = {
    confirmed: "text-green-600",
    pending: "text-yellow-600",
    cancelled: "text-red-600",
    completed: "text-blue-600",
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your clinic today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2 this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-3xl font-bold text-gray-900">{stats.confirmedAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600">
              {stats.totalAppointments > 0
                ? Math.round((stats.confirmedAppointments / stats.totalAppointments) * 100)
                : 0}
              % of total
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600">Needs attention</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
            <a href="/admin/appointments" className="text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {recentAppointments.map((appointment) => {
              const status = getAppointmentStatus(appointment)
              const StatusIcon = statusIcons[status]
              return (
                <div key={appointment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={`w-5 h-5 ${statusColors[status]}`} />
                    <div>
                      <p className="font-medium text-gray-900">{appointment.userData?.name}</p>
                      <p className="text-sm text-gray-600">{appointment.docData?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.slotDate}</p>
                    <p className="text-sm text-gray-600">{appointment.slotTime}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Doctors */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Doctors</h2>
            <a href="/admin/doctors" className="text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </a>
          </div>

          <div className="space-y-4">
            {doctors.slice(0, 4).map((doctor, index) => (
              <div key={doctor._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{doctor.patients || 0} patients</p>
                  <p className="text-sm text-gray-600">Rating: {doctor.rating || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/add-doctor"
            className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Add New Doctor</p>
              <p className="text-sm text-gray-600">Register a new doctor</p>
            </div>
          </Link>

          <Link
            to="/admin/appointments"
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Manage Appointments</p>
              <p className="text-sm text-gray-600">View and update appointments</p>
            </div>
          </Link>

          <Link
            to="/admin/doctor-panel"
            className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Doctor Panel</p>
              <p className="text-sm text-gray-600">Access doctor dashboard</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
