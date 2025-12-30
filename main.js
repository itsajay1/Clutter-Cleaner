const fs = require('fs');
const path = require('path');

// Specify the folder path to organize
const folderPath = './your-folder-path-here';

const fileTypes = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
    documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
    audio: ['.mp3', '.wav', '.aac', '.flac', '.ogg'],
    video: ['.mp4', '.avi', '.mov', '.mkv', '.wmv'],
    archives: ['.zip', '.rar', '.7z', '.tar', '.gz', '.exe']
};

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(folderPath, file);

        if (fs.lstatSync(filePath).isDirectory()) return;

        const ext = path.extname(file).toLowerCase();

        for (let type in fileTypes) {
            if (fileTypes[type].includes(ext)) {
                const destFolder = path.join(folderPath, type);

                if (!fs.existsSync(destFolder)) {
                    fs.mkdirSync(destFolder);
                }

                const destPath = path.join(destFolder, file);
                fs.renameSync(filePath, destPath);
                console.log(`Moved: ${file} to ${type} folder`);
                break;
            }
        }
    });
});