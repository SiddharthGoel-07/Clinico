"use client"
import { NavLink } from "react-router-dom"
import { LayoutDashboard, Calendar, Users, UserPlus, Stethoscope, LogOut } from "lucide-react"
import { useAdminContext } from "./AdminContext"

const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Calendar, label: "All Appointments", href: "/admin/appointments" },
    { icon: Stethoscope, label: "Doctor Panel", href: "/admin/doctor-panel" },
    { icon: UserPlus, label: "Add Doctor", href: "/admin/add-doctor" },
    { icon: Users, label: "All Doctors", href: "/admin/doctors" },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold">Clinico Admin</span>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.href}
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                isActive
                  ? "bg-gray-800 text-white border-r-2 border-emerald-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

const AdminHeader = ({ onLogout }) => {
  const { adminUser } = useAdminContext()

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken")
    }
    onLogout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {adminUser.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

const AdminLayout = ({ children, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader onLogout={onLogout} />
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
