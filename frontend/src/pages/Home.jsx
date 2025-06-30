"use client"
import { useNavigate } from "react-router-dom"
import { Calendar, Users, Clock, Award, ArrowRight, Star } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const Home = () => {
  const { doctors } = useAppContext()
  const navigate = useNavigate()

  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments with your preferred doctors in just a few clicks",
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Access to qualified and experienced medical professionals",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your healthcare needs",
    },
    {
      icon: Award,
      title: "Quality Care",
      description: "Committed to providing the highest standard of medical care",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Health, Our
                <span className="text-emerald-600"> Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with qualified doctors, book appointments easily, and take control of your healthcare journey
                with Clinico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/doctors")}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors text-center font-semibold"
                >
                  Find Doctors
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-center font-semibold"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Healthcare professionals"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-600">Happy Patients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Clinico?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making healthcare accessible, convenient, and reliable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{doctor.speciality}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience} experience</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-700">{doctor.rating}</span>
                    </div>
                    <button
                      onClick={() => navigate("/booking", { state: { doctorId: doctor._id } })}
                      className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/doctors")}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
            >
              View All Doctors
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take Care of Your Health?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust Clinico for their healthcare needs.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
