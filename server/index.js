const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Konfigurasi Koneksi ke Laragon MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Default user Laragon
    password: '',      // Default password Laragon
    database: 'db_portofolio' // <--- SUDAH DIGANTI SESUAI NAMA DATABASE KAMU
});

// Cek koneksi
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Berhasil terkoneksi ke database db_portofolio...');
    }
});

// ... kode atas tetap sama ...

// 2. API untuk menerima Pesan (POST)
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;
    
    // --- CCTV: Cek apakah data sampai disini ---
    console.log("🔥 DATA MASUK DARI FRONTEND:");
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Pesan:", message);
    // -------------------------------------------

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error("❌ Gagal Simpan ke SQL:", err); // Log error SQL
            return res.status(500).send(err);
        }
        console.log("✅ Berhasil Simpan ke Database, ID:", result.insertId);
        res.send({ message: "Pesan berhasil disimpan!", id: result.insertId });
    });
});

// ... kode bawah tetap sama ...

// Jalankan Server di Port 5000
app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});