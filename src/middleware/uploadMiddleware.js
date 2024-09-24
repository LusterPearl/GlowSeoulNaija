import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory relative to the current directory
const uploadsDir = path.join(__dirname, '../uploads/');

// Ensure the 'uploads/' directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Define storage for multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Directory where the file should be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.userId}_${Date.now()}${path.extname(file.originalname)}`); // Custom file naming convention
  }
});

// Initialize multer with storage, file size limit, and file type filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Only images are allowed!')); // Improved error handling
    }
  }
}).single('avatar'); // Accept a single file with the field name 'avatar'

// Middleware function for handling file uploads
export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(400).json({ error: err.message });
      }
    }
    next();
  });
};
