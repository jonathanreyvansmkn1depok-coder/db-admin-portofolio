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
// SIMPAN PESAN
// =========================
app.post('/api/messages', (req, res) => {

    const {
        name,
        email,
        message
    } = req.body;

    if (!name || !email || !message) {

        return res.status(400).json({
            success: false,
            error: 'Semua field wajib diisi'
        });

    }

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

                return res.status(500).json({
                    success: false,
                    error: err.message
                });

            }

            res.json({
                success: true,
                id: result.insertId
            });

        }
    );

});


// =========================
// AMBIL SEMUA PESAN
// =========================
app.get('/api/messages', (req, res) => {

    const sql = `
        SELECT *
        FROM messages
        ORDER BY id DESC
    `;

    db.query(
        sql,
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
// AMBIL 1 PESAN BERDASARKAN ID
// =========================
app.get('/api/messages/:id', (req, res) => {

    const { id } = req.params;

    db.query(
        'SELECT * FROM messages WHERE id = ?',
        [id],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    error: err.message
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    error: 'Pesan tidak ditemukan'
                });

            }

            res.json(result[0]);

        }
    );

});


// =========================
// HAPUS PESAN
// =========================
app.delete('/api/messages/:id', (req, res) => {

    const { id } = req.params;

    db.query(
        'DELETE FROM messages WHERE id = ?',
        [id],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    error: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    error: 'Pesan tidak ditemukan'
                });

            }

            res.json({
                success: true,
                message: 'Pesan berhasil dihapus'
            });

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