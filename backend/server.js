import express from 'express';
import mysql from 'mysql';
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'localgpt'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const { fileName, tags, level } = req.body;
  const filePath = req.file.filename;

  const query = `INSERT INTO devUpload (fileName, tags, level, filePath) VALUES (?, ?, ?, ?)`;
  db.query(query, [fileName, tags, level, filePath], (err, result) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ message: "Error uploading file" });
      return;
    }
    res.status(201).json({ id: result.insertId, fileName, tags, level, filePath });
  });
});

// Get all uploads endpoint
app.get('/uploads', (req, res) => {
  const query = "SELECT * FROM devUpload";
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching uploads:', err);
      res.status(500).json({ message: "Error fetching uploads" });
      return;
    }
    res.json(results);
  });
});

// Delete endpoint
app.delete('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const query = `DELETE FROM devUpload WHERE fileName = ?`;
  db.query(query, [fileName], (err, result) => {
    if (err) {
      console.error('Error deleting file:', err);
      res.status(500).json({ message: "Error deleting file" });
      return;
    }
    res.json({ message: `File ${fileName} deleted successfully` });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { uid, password } = req.body;
  const query = `SELECT * FROM login WHERE uid = ? AND password = ?`;
  db.query(query, [uid, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
