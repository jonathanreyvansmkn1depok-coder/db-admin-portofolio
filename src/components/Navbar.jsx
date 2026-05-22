import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaUser, FaCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion' // Import Framer Motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // State untuk melacak item mana yang sedang di-hover
  const [hoveredPath, setHoveredPath] = useState(null)
  
  // Untuk mengetahui halaman mana yang aktif (agar teks tetap menyala)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Daftar Menu Navigasi (Agar kodingan lebih rapi & mudah di-loop)
  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'About', path: '/about', icon: <FaUser /> },
    { name: 'Projects', path: '/projects', icon: <FaCode /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ]

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className={`${
          scrolled ? "bg-gray-900/90 border-gray-700" : "bg-gray-900/60 border-gray-800"
        } backdrop-blur-md border rounded-full px-2 py-2 flex items-center justify-between transition-all duration-300 shadow-2xl w-full max-w-4xl`}
      >
        
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text ml-6 mr-8">
          Jonathan<span className="text-white">.dev</span>
        </Link>

        {/* MENU DESKTOP (DENGAN SLIDING ANIMATION) */}
        <ul className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredPath(null)}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="relative">
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>

                {/* ANIMASI SLIDING BACKGROUND */}
                {/* Jika path item ini sama dengan yang sedang di-hover, munculkan background */}
                {hoveredPath === item.path && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-white/10 rounded-full -z-0"
                  />
                )}
                
                {/* INDICATOR HALAMAN AKTIF (Opsional: Titik kecil di bawah) */}
                {isActive && (
                   <motion.div 
                     layoutId="navbar-active-dot"
                     className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full mx-auto w-1/2" 
                   />
                )}
              </li>
            )
          })}
        </ul>

        {/* TOMBOL HAMBURGER (HP) */}
        <button 
          className="md:hidden text-white text-lg p-2 bg-gray-800 rounded-full mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="absolute top-20 w-[95%] max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 md:hidden">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsOpen(false)} 
                className={`p-3 rounded-xl font-medium flex items-center gap-3 transition ${
                  location.pathname === item.path ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
        </div>
      )}
    </nav>
  )
}