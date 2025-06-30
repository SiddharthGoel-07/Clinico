"use client"

import { useState } from "react"
import { Search, Filter, Edit, Trash2, Eye, Star, Users } from "lucide-react"
import { useAdminContext } from "./AdminContext"

const AdminAllDoctors = () => {
  const { doctors, setDoctors } = useAdminContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("")

  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = filterSpecialty === "" || doctor.specialty === filterSpecialty
    return matchesSearch && matchesSpecialty
  })

  const handleStatusToggle = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId ? { ...doctor, status: doctor.status === "active" ? "inactive" : "active" } : doctor,
      ),
    )
  }

  const handleDelete = (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId))
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Doctors</h1>
        <p className="text-gray-600">Manage all registered doctors in the system</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
            Export
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative">
              <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doctor.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {doctor.status}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
              <p className="text-emerald-600 font-medium mb-2">{doctor.specialty}</p>
              <p className="text-gray-600 mb-3">{doctor.experience} experience</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-700">{doctor.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{doctor.patients} patients</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">${doctor.fees}</span>
                <span className="text-gray-600">per consultation</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleStatusToggle(doctor.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    doctor.status === "active"
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {doctor.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-600">No doctors match your search criteria.</p>
        </div>
      )}
    </div>
  )
}

export default AdminAllDoctors
