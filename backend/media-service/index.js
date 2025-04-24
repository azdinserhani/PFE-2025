import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Local storage
  },
  filename: (req, file, cb) => {
    // Keep original name, or you can rename here
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Serve uploaded files statically
app.use('/media', express.static(path.join(__dirname, 'uploads')));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`;
  res.status(200).json({ message: 'Upload successful', url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
