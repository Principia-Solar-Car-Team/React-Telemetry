const express = require('express');
const multer = require('multer');
const path = require('path');
const { PythonShell } = require('python-shell');

const app = express();
const port = 5000;

// Set up file upload with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  // Run Python script for file processing
  PythonShell.run('process_file.py', { args: [filePath] }, (err, result) => {
    if (err) {
      res.status(500).send({ error: 'Error processing the file' });
    } else {
      res.send({ message: 'File processed successfully', data: result });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
