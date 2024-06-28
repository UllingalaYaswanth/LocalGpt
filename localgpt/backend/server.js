import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'localgpt'
});

db.connect((err) => {
    if (err) {
        console.log(err.stack);
        return;
    }
    console.log('db connected successful');
});

// Endpoint for handling login
app.post('/login', (req, res) => {
    const { uid, password } = req.body;
    const query = `SELECT * FROM login WHERE uid = '${uid}' AND password = '${password}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (result.length > 0) {
            const user = result[0];
            res.json({ status: "success", role: user.role }); // Return role along with success status
        } else {
            res.status(401).json({ status: "error", message: "Invalid credentials" });
        }
    });
});


app.listen(8081, () => {
    console.log('Listening on port 8081');
});
