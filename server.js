const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Upload</title>
        </head>
        <body>
            <h1>File Uploaded Successfully</h1>
            <img src="/uploads/${req.file.filename}" alt="Uploaded Image" style="max-width: 100%; max-height: 400px;">
            <br>
            <a href="/">Go Back</a>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
