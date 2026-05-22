import { projectsList } from '../data/index.js' // Ambil datanya
import { Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa' // Import ikon (kalau sudah install react-icons)

export default function Projects() {
  return (
    <section className="min-h-screen text-white py-20 px-6">
      <div className="container mx-auto">
        
        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-500">Karya Saya</h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Berikut adalah beberapa proyek yang telah saya kerjakan. Klik tombol untuk melihat detailnya.
        </p>

        {/* Grid Container (Tempat Kartu-kartu Berbaris) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* LOOPING: Mengubah Data Menjadi Kartu HTML secara Otomatis */}
          {projectsList.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition duration-300 border border-gray-700">
              
              {/* Gambar Project */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Isi Teks */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tags Teknologi */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-700 text-xs rounded-full text-blue-300">
                      {item}
                    </span>
                  ))}
                </div>

                {/* Tombol Action */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <a href={project.link} className="flex items-center gap-2 text-sm text-white hover:text-blue-400 transition">
                    Lihat Kode <FaGithub />
                  </a>
                  <a href={project.link} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition">
                    Demo Live <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}