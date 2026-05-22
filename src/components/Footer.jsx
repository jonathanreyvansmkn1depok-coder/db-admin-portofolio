import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-800 relative z-10">
      <div className="container mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center">
        
        {/* BAGIAN TEKS COPYRIGHT DENGAN LINK */}
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Portofolio Saya. Dibuat dengan{' '}
          <a 
            href="https://react.dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold hover:text-blue-400 transition"
          >
            React
          </a>
          {' '} & {' '}
          <a 
            href="https://www.tailwind.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold hover:text-cyan-400 transition"
          >
            Tailwind
          </a>.
        </p>
        
        {/* BAGIAN SOSIAL MEDIA */}
        <div className="flex gap-6">
          <a 
            href="https://github.com/jonathanreyvansmkn1depok-coder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-white transition transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a 
            href="https://www.instagram.com/joorerere?igsh=YTMzaHAwOGs1MGU1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-pink-500 transition transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a 
            href="https://www.linkedin.com/in/jonathan-reyvan-478b59343" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>

      </div>
    </footer>
  )
}