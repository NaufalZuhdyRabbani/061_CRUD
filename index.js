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

//buat Method GET DAN POST
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error fetching users: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    })
});

