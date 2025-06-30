"use client"
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Shield, LogOut } from "lucide-react"
import { useAppContext } from "../context/AppContext"

const Header = ({ onAdminClick }) => {
  const { token, user, logout } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="bg-white shadow-sm border-b border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-emerald-800">Clinico</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/doctors" className="text-gray-700 hover:text-emerald-600 transition-colors">Doctors</Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">Contact</Link>
            {(token || user) && (
              <Link to="/my-appointments" className="text-gray-700 hover:text-emerald-600 transition-colors font-bold border-b-2 border-emerald-600">My Appointments</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-2 text-gray-700 hover:text-slate-600 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {token ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 hover:text-emerald-600 transition-colors">Profile</Link>
                <span className="text-gray-600">Hi, {user?.name || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold">Clinico</span>
            </div>
            <p className="text-gray-400 mb-4">Your trusted healthcare partner providing quality medical services.</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/doctors" className="text-gray-400 hover:text-emerald-400">Find Doctors</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-emerald-400">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-emerald-400">Contact</Link></li>
              <li><Link to="/my-appointments" className="text-gray-400 hover:text-emerald-400">Appointments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Cardiology</li>
              <li className="text-gray-400">Dermatology</li>
              <li className="text-gray-400">Pediatrics</li>
              <li className="text-gray-400">Orthopedics</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">info@clinico.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-400">123 Medical Center Dr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Clinico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const Layout = ({ children, onAdminClick }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onAdminClick={onAdminClick} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
