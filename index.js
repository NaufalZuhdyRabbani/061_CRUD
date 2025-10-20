const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asddsaawas123',
    database: 'mahasiswa',
    port: 3308
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL:' + err.stack);
        return;
    }
});

//POST
app.post('/api/users', (req, res) => {
    const { nama, nim, kelas, } = req.body;
    if (!nama || !nim || !kelas) {
        return res.status(400).json({ message: 'Nama, NIM, dan Kelas harus diisi' });
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)', [nama, nim, kelas],
        (err, results) => {
            if (err) {
                console.error('Gagal menambahkan data' + err.stack);
                return res.status(500).json({ message: 'Gagal menambahkan data' });
            }
            res.status(201).json({ message: 'Data berhasil ditambahkan' });
        }
    );
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?', [nama, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database Error' });
            }
            res.json({ message: 'User berhasil diupdate' });
        }
    );
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query(
        'DELETE FROM mahasiswa WHERE id = ?', [userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database Error' });
            }
            res.json({ message: 'User berhasil dihapus' });
        });
});


