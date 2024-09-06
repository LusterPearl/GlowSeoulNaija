import multer from 'multer';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path where files will be saved (create 'uploads' folder in root)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set up file filter to accept only specific file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;  // Accepted file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
  }
};

// Initialize multer with storage and file filter options
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5MB in this example)
  fileFilter: fileFilter
});

export default upload;
