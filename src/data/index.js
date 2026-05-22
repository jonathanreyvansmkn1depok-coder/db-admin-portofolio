// src/data/index.js
import portfolioImg from '../assets/fotomewing.jpeg' // Pakai foto yang ada dulu sebagai contoh

export const projectsList = [
  {
    id: 1,
    title: "Website Portofolio",
    description: "Website pribadi yang dibuat menggunakan React, Vite, dan Tailwind CSS. Fitur utamanya adalah SPA (Single Page Application).",
    image: portfolioImg, // Nanti ganti dengan screenshot website aslinya
    link: "#", // Link ke GitHub atau demo
    tech: ["React", "Tailwind", "Vite"]
  },
  {
    id: 2,
    title: "Aplikasi Todo List",
    description: "Aplikasi pencatat tugas sederhana dengan fitur tambah, hapus, dan tandai selesai.",
    image: portfolioImg, 
    link: "#",
    tech: ["JavaScript", "HTML", "CSS"]
  },
  {
    id: 3,
    title: "Landing Page UMKM",
    description: "Desain landing page untuk produk makanan lokal agar terlihat lebih menarik.",
    image: portfolioImg, 
    link: "#",
    tech: ["UI/UX", "Figma"]
  },
]