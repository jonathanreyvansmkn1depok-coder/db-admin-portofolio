import { useState } from 'react'

export default function FlipCard({ title, subtitle, description, icon, image }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    // Wrapper Luar (Ukuran Kartu)
    <div className="card-container w-[300px] h-[400px]">
      
      {/* Bagian Dalam (Yang Berputar) */}
      <div 
        className={`card-inner ${isFlipped ? 'flipped' : ''}`} 
        onClick={() => setIsFlipped(!isFlipped)}
      >
        
        {/* === BAGIAN DEPAN === */}
        <div className="card-front">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 card-img-border">
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-blue-300 font-medium">{subtitle}</p>
          <p className="mt-8 text-sm text-gray-400">Klik untuk membalik ↻</p>
        </div>

        {/* === BAGIAN BELAKANG === */}
        <div className="card-back">
          <div className="text-5xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-4">Detail</h3>
          <p className="text-center text-sm leading-relaxed">
            {description}
          </p>
          <button className="mt-6 px-4 py-2 bg-white text-blue-600 rounded-full font-bold text-sm hover:bg-gray-100 transition">
            Tutup
          </button>
        </div>

      </div>
    </div>
  )
}