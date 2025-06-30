"use client"

import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { Search, Star, Calendar, Filter } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const AllDoctors = () => {
  const { doctors } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const navigate = useNavigate()

  const specialties = [...new Set(doctors.map((doctor) => doctor.speciality))]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "" || doctor.speciality === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
          <p className="text-xl text-gray-600">Find the right healthcare professional for your needs</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
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
              Search
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-emerald-600 font-medium mb-2">{doctor.speciality}</p>
                <p className="text-gray-600 mb-3">{doctor.experience} experience</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{doctor.about}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">${doctor.fees}</span>
                  <span className="text-gray-600">per consultation</span>
                </div>

                <div className="flex space-x-2 mb-4">
                  {doctor.availableDays &&
                    doctor.availableDays.slice(0, 3).map((day, index) => (
                      <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {day}
                      </span>
                    ))}
                </div>

                <button
                  onClick={() => navigate("/booking", { state: { doctorId: doctor._id } })}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllDoctors
