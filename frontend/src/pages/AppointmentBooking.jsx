"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ArrowLeft, Check } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import {toast} from "react-toastify";
import axios from "axios"

const AppointmentBooking = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { doctors, addAppointment, token } = useAppContext() // get user from context

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true, state: { from: location } })
    }
  }, [token, navigate, location])

  const doctorId = location.state?.doctorId || "1"
  const doctor = doctors.find((doc) => doc._id === doctorId)

  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    slotDate: "",
    slotTime: "",
    userData: {
      name: "",
      email: "",
      phone: "",
      address: { line1: "", line2: "" },
      gender: "",
      dob: "",
    },
    notes: "",
  })

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("userData.")) {
      const field = name.split(".")[1]
      if (field === "address") {
        const addressField = name.split(".")[2]
        setBookingData((prev) => ({
          ...prev,
          userData: {
            ...prev.userData,
            address: { ...prev.userData.address, [addressField]: value },
          },
        }))
      } else {
        setBookingData((prev) => ({
          ...prev,
          userData: { ...prev.userData, [field]: value },
        }))
      }
    } else {
      setBookingData({
        ...bookingData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {

    try {
      
      e.preventDefault()
    const appointment = {
      
      docId: doctor._id,
      slotDate: bookingData.slotDate,
      slotTime: bookingData.slotTime,
      userData: bookingData.userData,
      docData: {
        name: doctor.name,
        speciality: doctor.speciality,
        fees: doctor.fees,
      },
      amount: doctor.fees,
      cancelled: false,
      payment: false,
      isCompleted: false,
    }
    
    const { data } =await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/book-appointment",appointment , {headers :{ token :token}})

    if(data.success) {
      toast.success("Appointment booked successfully!")
    }
    else
    {
      toast.error(error.message);
    }

    setStep(4)

    } catch (error) {
      console.log(error)
      toast.error(error)
    }
    
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (!doctor) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor not found</h1>
          <button
            onClick={() => navigate("/doctors")}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/doctors")}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Doctors</span>
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Appointment</h1>
            <p className="text-xl text-gray-600">Schedule your visit with {doctor.name}</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-emerald-600" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span className={step >= 1 ? "text-emerald-600 font-medium" : "text-gray-500"}>Select Date & Time</span>
              <span className={step >= 2 ? "text-emerald-600 font-medium" : "text-gray-500"}>Personal Information</span>
              <span className={step >= 3 ? "text-emerald-600 font-medium" : "text-gray-500"}>Review & Confirm</span>
              <span className={step >= 4 ? "text-emerald-600 font-medium" : "text-gray-500"}>Confirmation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                <p className="text-emerald-600 font-medium mb-2">{doctor.speciality}</p>
                <p className="text-gray-600 mb-4">{doctor.experience} experience</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Consultation Fee:</span>
                    <span className="font-semibold">${doctor.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="font-semibold">{doctor.rating || "N/A"}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="slotDate"
                        value={bookingData.slotDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-4">Available Time Slots</label>
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, slotTime: time })}
                            className={`p-3 rounded-lg border text-center transition-colors ${
                              bookingData.slotTime === time
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-white text-gray-700 border-gray-300 hover:border-emerald-500"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={nextStep}
                      disabled={!bookingData.slotDate || !bookingData.slotTime}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="userData.name"
                            value={bookingData.userData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="userData.email"
                            value={bookingData.userData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="userData.phone"
                            value={bookingData.userData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <select
                            name="userData.gender"
                            value={bookingData.userData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input
                            type="date"
                            name="userData.dob"
                            value={bookingData.userData.dob}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                          <input
                            type="text"
                            name="userData.address.line1"
                            value={bookingData.userData.address.line1}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Street address"
                          />
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                        >
                          Back
                        </button>
                        <button
                          onClick={nextStep}
                          disabled={
                            !bookingData.userData.name || !bookingData.userData.email || !bookingData.userData.phone
                          }
                          className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h2>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Appointment Details:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Doctor:</span>
                          <span className="font-medium">{doctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Specialty:</span>
                          <span className="font-medium">{doctor.speciality}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">{bookingData.slotDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">{bookingData.slotTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Patient:</span>
                          <span className="font-medium">{bookingData.userData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fee:</span>
                          <span className="font-medium">${doctor.fees}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={prevStep}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
                    <p className="text-gray-600 mb-8">
                      Your appointment has been successfully booked. You will receive a confirmation email shortly.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                      <h3 className="font-semibold text-gray-900 mb-4">Appointment Details:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Doctor:</span>
                          <span className="font-medium">{doctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">{bookingData.slotDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span className="font-medium">{bookingData.slotTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Patient:</span>
                          <span className="font-medium">{bookingData.userData.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => navigate("/my-appointments")}
                        className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-center"
                      >
                        View My Appointments
                      </button>
                      <button
                        onClick={() => navigate("/doctors")}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentBooking
