import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
// --- IMPORT ICON LENGKAP (Frontend + Backend) ---
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaNodeJs, 
  FaMapMarkerAlt, FaDownload, FaBriefcase, FaMobileAlt, FaRocket,
  FaCode, FaHeadset, FaArrowRight, FaGithub, FaPhp, FaDatabase
} from "react-icons/fa";
import { SiTailwindcss, SiLaravel, SiMysql, SiBootstrap } from "react-icons/si"; 
import fotoProfil from '../assets/fotomewing.jpeg'
import fotoProfil2 from '../assets/mewing2.jpeg' 

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false)

  // --- DATA TECH STACK (Updated: Tambah Laravel & MySQL) ---
  const techStack = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiLaravel />, name: "Laravel" }, 
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiMysql />, name: "MySQL" },     
    { icon: <FaPhp />, name: "PHP" },         
    { icon: <SiTailwindcss />, name: "Tailwind" }, 
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaGitAlt />, name: "Git" },
  ];

  // --- DATA CAPABILITIES (Updated: Tambah Backend) ---
  const capabilities = [
    { icon: <FaReact/>, title: "Frontend Dev", desc: "Membangun antarmuka website yang modern menggunakan React Ecosystem." },
    { icon: <SiLaravel/>, title: "Backend Dev", desc: "Membangun sistem yang kuat dan aman menggunakan Framework Laravel." }, 
    { icon: <FaMobileAlt/>, title: "Responsive", desc: "Tampilan presisi di semua perangkat, dari HP hingga Desktop monitor." },
    { icon: <FaRocket/>, title: "Fast Performance", desc: "Optimasi kecepatan website agar loading super cepat (High Core Web Vitals)." },
    { icon: <FaDatabase/>, title: "Database Mgt", desc: "Perancangan struktur database MySQL yang efisien dan relasional." }, 
    { icon: <FaHeadset/>, title: "Support", desc: "Siap membantu maintenance dan perbaikan bug setelah project selesai." },
  ];

  // --- DATA FEATURED PROJECTS (Updated: Real Projects) ---
  const featuredProjects = [
    {
      id: 1,
      title: "Kedai Kopi Management",
      desc: "Aplikasi web manajemen operasional kedai kopi. Mencakup fitur manajemen menu (CRUD), pemesanan pelanggan, dan dashboard admin.",
      tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop", 
      link: "https://github.com/jonathanreyvansmkn1depok-coder/kedai-kopi-app", // Link GitHub
      isExternal: true // Penanda link keluar (GitHub)
    },
    {
      id: 2,
      title: "My Portfolio Website",
      desc: "Website portofolio pribadi yang interaktif. Fitur kontak form terintegrasi ke backend lokal (Node.js) dan animasi framer motion.",
      tech: ["React JS", "Tailwind", "Node.js", "MySQL"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      link: "https://github.com/jonathanreyvansmkn1depok-coder", // Link GitHub Profile
      isExternal: true
    }
  ];

  const marqueeVariants = {
    animate: { x: [0, -1000], transition: { x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } } },
  };

  return (
    <div className="overflow-x-hidden w-full text-white"> 
      
      {/* =======================
          SECTION 1: HERO
         ======================= */}
      <section className="relative z-10 flex items-center justify-center min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* FOTO PROFIL */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center md:justify-start"
          >
            <div 
                className="relative w-64 h-64 md:w-96 md:h-96 cursor-pointer group perspective-container"
                onClick={() => setIsFlipped(!isFlipped)} 
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.3)]">
                        <img src={fotoProfil} alt="Foto Depan" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                             <span className="text-white font-bold text-sm tracking-widest bg-black/50 px-3 py-1 rounded-full">KLIK SAYA! ↻</span>
                        </div>
                    </div>
                    <div 
                        className="absolute inset-0 w-full h-full backface-hidden rounded-full overflow-hidden border-4 border-blue-500/50 shadow-[0_0_80px_rgba(59,130,246,0.5)] bg-gray-800"
                        style={{ transform: "rotateY(180deg)" }} 
                    >
                        <img src={fotoProfil2} alt="Foto Belakang" className="w-full h-full object-cover" />
                    </div>
                </motion.div>
            </div>
          </motion.div>

          {/* TEKS & INFO */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Open for Freelance
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Halo, Saya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Jonathan Reyvan
              </span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-10">
              <span>I am a </span>
              <TypeAnimation
                sequence={['Web Developer', 1000, 'Laravel Developer', 1000, 'React Enthusiast', 1000]}
                wrapper="span"
                speed={50}
                className="text-blue-400"
                repeat={Infinity}
              />
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
              Fokus menciptakan website modern yang interaktif dengan <strong>React</strong> dan sistem backend yang handal menggunakan <strong>Laravel</strong>.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-sm text-gray-500 font-medium justify-center md:justify-start">
              <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500" /> Based in Depok, Indonesia</div>
              <div className="flex items-center gap-2"><FaBriefcase className="text-green-500" /> Available for Projects</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
                  Hire Me Now <span className="text-xl">🚀</span>
                </motion.button>
              </Link>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 border border-gray-600 text-white rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2">
                  <FaDownload /> Download CV
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =======================
          SECTION 2: MARQUEE
         ======================= */}
      <div className="py-10 px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden py-6"> 
          <motion.div className="flex gap-16 min-w-max" variants={marqueeVariants} animate="animate">
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400 text-2xl font-bold">
                <span className="text-4xl text-blue-500">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* =======================
          SECTION 3: CAPABILITIES
         ======================= */}
       <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl"> 
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white tracking-tight"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Capabilities</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative p-8 rounded-2xl text-center text-white transition-all duration-500 ease-in-out hover:-translate-y-6"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="text-6xl text-white group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
                    {item.icon}
                  </div>
                </div>
                <h6 className="text-2xl font-bold mb-4 capitalize font-[Montserrat]">{item.title}</h6>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link to="/about" className="inline-block px-6 py-2 border-2 border-white rounded-full text-white text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900 flex items-center gap-2 mx-auto w-max">
                  Learn More <FaArrowRight size={12}/>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          SECTION 4: FEATURED PROJECTS
         ======================= */}
      <section className="py-20 px-6 bg-gray-900/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-2"
              >
                Karya Terpilih
              </motion.h2>
              <p className="text-gray-400">Beberapa proyek terbaik yang pernah saya kerjakan.</p>
            </div>

            {/* --- REVISI: TOMBOL TETAP KE HALAMAN /projects --- */}
            <Link to="/projects">
              <motion.button whileHover={{ x: 5 }} className="text-blue-400 font-semibold flex items-center gap-2 hover:text-blue-300 transition">
                Lihat Semua Proyek →
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {featuredProjects.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-xl"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500 z-10"></div>
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition">{project.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">{project.desc}</p>
                  
                  {/* --- LOGIC TOMBOL: Jika External (GitHub) pakai <a>, Jika Internal pakai <Link> --- */}
                  {project.isExternal ? (
                     <a href={project.link} target="_blank" rel="noreferrer" className="inline-block w-full">
                        <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition flex justify-center items-center gap-2">
                           <FaGithub /> Lihat Kode di GitHub
                        </button>
                     </a>
                  ) : (
                    <Link to={project.link} className="inline-block w-full">
                        <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition flex justify-center items-center gap-2">
                           Lihat Detail Proyek
                        </button>
                    </Link>
                  )}
                  
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =======================
          SECTION 5: CTA
         ======================= */}
      <section className="py-10 px-6 relative z-10 pb-32">
        <div className="container mx-auto max-w-6xl text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-12 rounded-3xl border border-white/10 backdrop-blur-md">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Tertarik Bekerja Sama?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Mari diskusikan ide hebat Anda dan wujudkan menjadi website yang nyata. Data Anda akan aman di database lokal saya!
          </p>
          <Link to="/contact">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-blue-900 font-bold rounded-full text-lg shadow-xl hover:shadow-white/20 transition">
              Hubungi Saya Sekarang
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}