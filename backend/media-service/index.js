import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
// Create uploads folder if not exists
const uploadDir = path.join("F:", "media-uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage config for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store on E: drive
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Function to check if file is a video
const isVideoFile = (mimetype) => {
  return mimetype.startsWith('video/');
};

// Function to get video duration
const getVideoDuration = async (filePath) => {
  try {
    const info = await ffprobe(filePath, { path: ffprobeStatic.path });
    const videoStream = info.streams.find(stream => stream.codec_type === 'video');
    return videoStream ? parseFloat(videoStream.duration) : null;
  } catch (error) {
    console.error('Error getting video duration:', error);
    return null;
  }
};

// Function to format duration from seconds to readable format
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  let formatted = "";
  if (hours > 0) {
    formatted += `${hours}h `;
  }
  if (minutes > 0) {
    formatted += `${minutes}m `;
  }
  if (remainingSeconds > 0 || formatted === "") {
    formatted += `${remainingSeconds}s`;
  }

  return formatted.trim();
};

// Serve uploaded files statically
app.use("/media", express.static(uploadDir));

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/media/${
    req.file.filename
  }`;

  let response = {
    message: "Upload successful",
    url: fileUrl,
    fileType: req.file.mimetype,
  };

  // If the uploaded file is a video, calculate its duration
  if (isVideoFile(req.file.mimetype)) {
    const filePath = req.file.path;
    const duration = await getVideoDuration(filePath);
    
    if (duration !== null) {
      response.duration = duration; // Duration in seconds
      response.durationFormatted = formatDuration(duration);
    }
  }

  res.status(200).json(response);
});

app.listen(process.env.PORT, () => {
  console.log(`media service is running on Port:${process.env.PORT}`);
});
