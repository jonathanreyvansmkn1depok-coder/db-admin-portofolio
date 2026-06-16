import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

// 1. Import komponen animasi background
import BackgroundAnimation from './components/BackgroundAnimation'

export default function App() {
  return (
    <BrowserRouter>
      {/* 2. Taruh BackgroundAnimation di paling atas dalam div utama */}
      <BackgroundAnimation />
      
      <div className="flex flex-col min-h-screen relative z-10"> {/* z-10 agar konten ada di depan animasi */}
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  )
}