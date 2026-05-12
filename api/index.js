const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    const dirPath = path.join(process.cwd(), 'myfiles');
    
    try {
        const files = fs.readdirSync(dirPath);
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ error: "Folder nahi mila" });
    }
}
