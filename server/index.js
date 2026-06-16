require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// KONEKSI DATABASE RAILWAY
// =========================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error konek database:', err);
    } else {
        console.log('✅ Berhasil konek Railway MySQL');
    }
});


// =========================
// ROOT ENDPOINT
// =========================
app.get('/', (req, res) => {
    res.json({
        status: 'Backend Railway Aktif'
    });
});


// =========================
// TEST DATABASE
// (boleh dihapus nanti)
// =========================
app.get('/test-db', (req, res) => {

    db.query(
        'SELECT NOW() AS waktu',
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(result);
        }
    );

});


// =========================
// SIMPAN PESAN CONTACT FORM
// =========================
app.post('/api/messages', (req, res) => {

    const { name, email, message } = req.body;

    // Validasi sederhana
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Semua field wajib diisi'
        });
    }

    console.log('🔥 DATA MASUK');
    console.log('Nama:', name);
    console.log('Email:', email);
    console.log('Pesan:', message);

    const sql = `
        INSERT INTO messages
        (name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, message],
        (err, result) => {

            if (err) {

                console.error(
                    '❌ Gagal simpan:',
                    err
                );

                return res.status(500).json({
                    success: false,
                    error: err.message
                });

            }

            console.log(
                '✅ Berhasil simpan ID:',
                result.insertId
            );

            res.json({
                success: true,
                id: result.insertId
            });

        }
    );

});


// =========================
// AMBIL SEMUA PESAN
// (untuk dashboard admin)
// =========================
app.get('/api/messages', (req, res) => {

    db.query(
        `
        SELECT *
        FROM messages
        ORDER BY id DESC
        `,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    error: err.message
                });

            }

            res.json(result);

        }
    );

});


// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `🚀 Backend server running on port ${PORT}`
    );
});