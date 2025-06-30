"use client"

import { useState } from "react"
import { Save, X, Upload } from "lucide-react"
import { useAdminContext } from "./AdminContext"
import { toast } from "react-toastify"
import axios from "axios"

const AddDoctor = () => {
  const { addDoctor } = useAdminContext()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    fees: "",
    about: "",
    image: "",
    availableDays: [],
    address: { line1: "", line2: "" },
  })

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Oncology",
    "Gynecology",
    "Ophthalmology",
    "ENT",
  ]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if(name==="image")
    {
        setFormData({
        ...formData,
        [name]: e.target.files[0],
      })
    }
    else
    {
      if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }))
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
    }
  }

  const handleAvailabilityChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      // Convert formData state to FormData instance
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('password', formData.password)
      fd.append('speciality', formData.speciality)
      fd.append('degree', formData.degree)
      fd.append('experience', formData.experience)
      fd.append('fees', formData.fees)
      fd.append('about', formData.about)
      if (formData.image) {
        fd.append('image', formData.image)
      }
      // Merge address fields into one object
      fd.append('address', JSON.stringify({
        line1: formData.address.line1,
        line2: formData.address.line2
      }))
      formData.availableDays.forEach(day => fd.append('availableDays[]', day))

      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/admin/add-doctor",
        fd
      )

      if (data.success) {
        toast.success(data.message)
        alert("Doctor added successfully!")
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          speciality: "",
          degree: "",
          experience: "",
          fees: "",
          about: "",
          image: "",
          availableDays: [],
          address: { line1: "", line2: "" },
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Doctor</h1>
        <p className="text-gray-600">Register a new doctor to the system</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="doctor@clinico.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Set a password for doctor login"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty *</label>
                <select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree *</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="MD, FACC"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="10 Years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee *</label>
                <input
                  type="number"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="150"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                <input
                  type="text"
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="123 Medical Center Dr"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="address.line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Suite 100"
                />
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About Doctor *</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Brief description about the doctor's expertise and background..."
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Image URL (optional)"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Available Days *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleAvailabilityChange(day)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Add Doctor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor
