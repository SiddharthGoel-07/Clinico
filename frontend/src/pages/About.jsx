"use client"
import { Heart, Shield, Users, Award, Target, Eye } from "lucide-react"

const About = ({ navigate }) => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, respect, and genuine concern for their wellbeing.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your health information is secure with us. We maintain the highest standards of privacy and security.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our network includes only qualified, experienced healthcare professionals committed to excellence.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We continuously strive to improve our services and maintain the highest quality of care.",
    },
  ]

  const stats = [
    { number: "500+", label: "Happy Patients" },
    { number: "50+", label: "Expert Doctors" },
    { number: "10+", label: "Specialties" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-emerald-600">Clinico</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We're revolutionizing healthcare by making it more accessible, convenient, and patient-centered. Our
                mission is to connect patients with the right healthcare professionals at the right time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src="/placeholder.svg?height=500&width=600" alt="About Clinico" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize healthcare by providing a seamless platform that connects patients with qualified
                healthcare professionals, making quality medical care accessible to everyone, everywhere.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Eye className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To become the world's most trusted healthcare platform, where technology and human care converge to
                create better health outcomes for individuals and communities globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600">How we started and where we're going</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Clinico was founded in 2020 with a simple yet powerful vision: to make healthcare more accessible and
                convenient for everyone. Our founders, having experienced firsthand the challenges of finding and
                booking appointments with healthcare providers, set out to create a solution that would benefit both
                patients and doctors.
              </p>

              <p className="text-gray-700 mb-6">
                What started as a small team of passionate individuals has grown into a comprehensive healthcare
                platform serving thousands of patients and hundreds of healthcare professionals. We've built
                partnerships with leading medical institutions and continue to expand our network of qualified doctors.
              </p>

              <p className="text-gray-700">
                Today, Clinico stands as a testament to the power of technology in improving healthcare delivery. We're
                not just a booking platform – we're your healthcare partner, committed to supporting you on your journey
                to better health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Healthcare Community</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Experience the future of healthcare with Clinico. Book your first appointment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/doctors")}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Find a Doctor
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-emerald-600 transition-colors font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
