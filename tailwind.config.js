/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        }
      },
      // --- TAMBAHAN ANIMASI KREATIF ---
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'text-flow': 'textFlow 3s linear infinite',
        'shine': 'shine 3s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // Animasi Teks Warna Mengalir
        textFlow: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        // Animasi Kilatan Cahaya pada Tombol
        shine: {
          '0%': { left: '-100%' },
          '20%': { left: '100%' },
          '100%': { left: '100%' },
        }
      }
    },
  },
  plugins: [],
}