const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const isVideo = file.mimetype.startsWith("video/");
        const uploadDir = path.join(__dirname, `../public/Media/${isVideo ? "Videos" : "Images"}/${year}/${month}`);
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, fileExtension);
        const sanitizedOriginalName = sanitizeFileName(originalName);
        const randomString = crypto.randomBytes(4).toString("hex");
        const filename = `${timestamp}-${sanitizedOriginalName}-${randomString}${fileExtension}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/mov", "video/avi", "video/mkv"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images and videos are allowed"), false);
    }
};

const sanitizeFileName = (filename) => {
    return filename
        .replace(/\s+/g, '-')
        .normalize("NFD")
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000 * 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = { upload };