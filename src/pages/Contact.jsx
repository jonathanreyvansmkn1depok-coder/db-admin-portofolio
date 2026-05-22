import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentDots, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    
    try {
      // --- LOGIKA PENGIRIMAN DATA KE LOCALHOST ---
      console.log("Mengirim data ke backend...", formData); // Cek Console Browser

      const response = await fetch('https://backend-production-1825.up.railway.app/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Respon dari server:", result); // Cek Console Browser

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error("Gagal koneksi ke server:", error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 relative z-10 flex flex-col items-center">
      
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-10">
        
        {/* Bagian Kiri: Info Kontak */}
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex-1 bg-gradient-to-br from-blue-600 to-purple-700 p-10 rounded-3xl text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ayo Mengobrol!</h2>
          <p className="mb-8 text-blue-100 leading-relaxed">
            Punya ide proyek menarik atau sekadar ingin menyapa? Pesan ini akan dikirim langsung ke database lokal Anda.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaPhone className="text-2xl text-blue-300"/>
              <span>+62 895 2606 7381</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-blue-300"/>
              <span>jonathanreyvan2405@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-blue-300"/>
              <span>Depok, Indonesia</span>
            </div>
          </div>
        </motion.div>

        {/* Bagian Kanan: Form Input */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-gray-800/50 backdrop-blur-md border border-gray-700 p-8 rounded-3xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-gray-400 mb-2 font-medium">Nama Lengkap</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-500"/>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-500"/>
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2 font-medium">Pesan</label>
              <div className="relative">
                <FaCommentDots className="absolute left-4 top-4 text-gray-500"/>
                <textarea 
                  name="message" required rows="4" value={formData.message} onChange={handleChange}
                  placeholder="Tulis pesanmu disini..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition transform hover:scale-[1.02] ${
                loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-white text-blue-900 hover:bg-gray-100'
              }`}
            >
              {loading ? 'Mengirim...' : <><FaPaperPlane /> Kirim Pesan</>}
            </button>

            {/* NOTIFIKASI STATUS */}
            {status === 'success' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-green-500/20 border border-green-500 text-green-300 rounded-lg text-center font-bold">
                ✅ Pesan Berhasil Terkirim!
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-center">
                ❌ Gagal Terkirim. Silakan coba Lagi nanti.
              </motion.div>
            )}

          </form>
        </motion.div>

      </div>
    </section>
  )
}