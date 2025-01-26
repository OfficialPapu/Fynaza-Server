const { MainCategorySchema, SubCategorySchema } = require('../models/CategoryModel')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
// MainCategory
const GetMainCategorie = async (req, res) => {
    try {
        const MainCategoryList = await MainCategorySchema.find();
        if (MainCategoryList.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(MainCategoryList);

    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const uploadDir = path.join(__dirname, `../Media/Images/${year}/${month}`);

        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

const CreateMainCategory = async (req, res) => {
    try {
        
        
        const { name } = req.body;
        console.log(req.body);
        
        // Use multer's single file upload feature
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading file" });
            }
            // Check if the name or image is missing
            if (!name || !req.file) {
                return res.status(400).json({ message: "All fields are mandatory" });
            }

            const imagePath = `${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${req.file.filename}`;

            // Create the new category and save it
            const newCategory = new MainCategorySchema({ name, image: imagePath });
            const savedCategory = await newCategory.save();

            // Respond with the saved category
            res.status(201).json(savedCategory);
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetMainCategorie, CreateMainCategory }