import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaNodeJs, FaCode, FaPaintBrush, FaGamepad } from "react-icons/fa";
import { SiTailwindcss, SiFigma } from "react-icons/si";
// Jangan lupa import komponen FlipCard dan Foto
import FlipCard from '../components/FlipCard';
import fotoProfil from '../assets/fotomewing.jpeg';

export default function About() {
  // Data Skill
  const skills = [
    { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500", shadow: "group-hover:shadow-orange-500/50" },
    { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500", shadow: "group-hover:shadow-blue-500/50" },
    { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400", shadow: "group-hover:shadow-yellow-400/50" },
    { icon: <FaReact />, name: "React JS", color: "text-blue-400", shadow: "group-hover:shadow-blue-400/50" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-cyan-400", shadow: "group-hover:shadow-cyan-400/50" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-500", shadow: "group-hover:shadow-green-500/50" },
    { icon: <FaGitAlt />, name: "Git", color: "text-red-500", shadow: "group-hover:shadow-red-500/50" },
    { icon: <SiFigma />, name: "Figma", color: "text-purple-400", shadow: "group-hover:shadow-purple-400/50" },
    { icon: <FaCode />, name: "Clean Code", color: "text-gray-300", shadow: "group-hover:shadow-gray-300/50" },
  ];

  // Variasi animasi grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        
        {/* === BAGIAN 1: INTRO & SKILL GRID === */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          
          {/* KIRI: TEKS CERITA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Saya</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Halo! Saya <span className="text-white font-semibold">Jonathan Reyvan</span>, seorang pengembang web yang bersemangat mengubah ide kompleks menjadi antarmuka pengguna yang elegan dan fungsional.
              </p>
              <p>
                Perjalanan saya di dunia koding dimulai dari rasa penasaran tentang bagaimana sebuah website bekerja. Ketertarikan itu berkembang menjadi fokus mendalam pada <span className="text-blue-400">Frontend Development</span>.
              </p>
              <p>
                Tujuan saya bukan hanya menulis kode, tetapi menciptakan pengalaman digital yang cepat, responsif, dan menyenangkan bagi pengguna.
              </p>
            </div>
          </motion.div>

          {/* KANAN: SKILL GRID */}
          <div className="flex-1 w-full">
             <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left flex items-center justify-center lg:justify-start gap-3">
                <span className="inline-block w-2 h-8 bg-blue-500 rounded-full"></span>
                Tech Stack & Tools
             </h3>
             
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 sm:gap-6"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`group relative bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-gray-500 hover:shadow-lg ${skill.shadow} cursor-default overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color.replace('text-', 'from-')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                  <div className={`text-4xl md:text-5xl ${skill.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    {skill.icon}
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-white">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>


        {/* === BAGIAN 2: FLIP CARDS (SISI LAIN SAYA) === */}
        {/* Ini bagian yang kemarin hilang, sekarang sudah kembali! */}
        <div className="mt-20">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400"
            >
              Sisi Lain Saya
            </motion.h3>
            
            <div className="flex flex-wrap justify-center gap-10">
                {/* KARTU 1: The Coder */}
                <FlipCard 
                  title="The Coder"
                  subtitle="Frontend Enthusiast"
                  image={fotoProfil}
                  icon={<FaCode />}
                  description="Saya suka memecahkan masalah dengan kode. Fokus utama saya adalah React dan Tailwind CSS untuk menciptakan website yang cepat."
                />

                {/* KARTU 2: The Creator */}
                <FlipCard 
                  title="The Creator"
                  subtitle="UI/UX Interest"
                  image={fotoProfil}
                  icon={<FaPaintBrush />}
                  description="Koding tanpa desain itu membosankan. Saya selalu berusaha membuat tampilan yang enak dilihat dan user-friendly."
                />

                {/* KARTU 3: The Gamer */}
                <FlipCard 
                  title="The Gamer"
                  subtitle="Hobi & Personal"
                  image={fotoProfil}
                  icon={<FaGamepad />}
                  description="Di waktu luang, saya suka bermain game strategi untuk melatih pola pikir kritis, atau sekadar minum kopi sambil mencari inspirasi."
                />
            </div>
        </div>

      </div>
    </section>
  )
}