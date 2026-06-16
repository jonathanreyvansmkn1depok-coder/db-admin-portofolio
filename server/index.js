require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Koneksi Database Railway
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Cek koneksi database
db.connect((err) => {
    if (err) {
        console.error('❌ Error konek database:', err);
    } else {
        console.log('✅ Berhasil konek Railway MySQL');
    }
});

// API kirim pesan
app.post('/api/messages', (req, res) => {

    const { name, email, message } = req.body;

    console.log("🔥 DATA MASUK:");
    console.log("Nama:", name);
    console.log("Email:", email);
    console.log("Pesan:", message);

    const sql =
    `
    INSERT INTO messages
    (name,email,message)
    VALUES (?,?,?)
    `;

    db.query(
        sql,
        [name,email,message],
        (err,result)=>{

            if(err){

                console.error(
                    "❌ Gagal simpan:",
                    err
                );

                return res
                .status(500)
                .json({
                    error:err.message
                });

            }

            console.log(
                "✅ Berhasil simpan ID:",
                result.insertId
            );

            res.json({
                success:true,
                id:result.insertId
            });

        }
    );

});

// Railway wajib pakai process.env.PORT
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});