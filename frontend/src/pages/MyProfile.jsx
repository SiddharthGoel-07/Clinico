"use client"

import { useState } from "react"
import { Phone, MapPin, Calendar, Edit3, Save, X, Camera } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const MyProfile = () => {
  const { user, setUser } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@email.com",
    phone: user?.phone || "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1990-01-01",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
    bloodType: "O+",
    allergies: "None",
    medicalHistory: "No significant medical history",
  })

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    setUser({
      ...user,
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
    })
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleCancel = () => {
    setEditData({
      name: user?.name || "John Doe",
      email: user?.email || "john@email.com",
      phone: user?.phone || "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1990-01-01",
      emergencyContact: "Jane Doe - +1 (555) 987-6543",
      bloodType: "O+",
      allergies: "None",
      medicalHistory: "No significant medical history",
    })
    setIsEditing(false)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
            <p className="text-xl text-gray-600">Manage your personal information and medical details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src="/placeholder.svg?height=120&width=120"
                    alt="Profile"
                    className="w-30 h-30 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{editData.name}</h3>
                <p className="text-gray-600 mb-4">{editData.email}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{editData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>New York, USA</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.dateOfBirth}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyContact"
                        value={editData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.emergencyContact}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                    {isEditing ? (
                      <select
                        name="bloodType"
                        value={editData.bloodType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 py-3">{editData.bloodType}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                    {isEditing ? (
                      <textarea
                        name="allergies"
                        value={editData.allergies}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="List any known allergies..."
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.allergies}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                    {isEditing ? (
                      <textarea
                        name="medicalHistory"
                        value={editData.medicalHistory}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Brief medical history..."
                      />
                    ) : (
                      <p className="text-gray-900 py-3">{editData.medicalHistory}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Privacy Settings
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Notification Preferences
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-red-600">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Appointments</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Upcoming Appointments</span>
                  <span className="font-semibold text-emerald-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Favorite Doctors</span>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-900">2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
