const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 'downloads' folder ka path (aap ise badal sakte hain)
const dirPath = path.join(__dirname, 'downloads');

// Agar folder nahi hai toh bana do
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

app.use(express.static('public')); 
app.use('/download', express.static(dirPath));

// API jo files ki list degi
app.get('/api/files', (req, res) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) return res.status(500).json({ error: "Folder nahi mil raha" });
        res.json(files);
    });
});

// Frontend serve karein
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
