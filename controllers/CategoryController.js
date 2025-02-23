const { CategoriesSchema } = require('../models/CategoryModel')
const { upload } = require("../config/MulterConfig");
const { getFormattedPath, createSlug } = require("../config/UrlConfig");

const GetCategories = async (req, res) => {
    try {
        const Categories = await CategoriesSchema.find();
        if (Categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(Categories);

    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



const AddCategory = async (req, res) => {
    upload.single('Image')(req, res, async (err) => {
        try {
            if (err) {
                return res.status(400).json({ message: "Error uploading file" });
            }
            const { Category, Attribute } = req.body;
            const Slug = createSlug(Attribute);
            const Image = getFormattedPath(req.file.path);
            const newCategory = new CategoriesSchema({ Category, CategoryAttribute:Attribute, Slug, Image });
            const savedCategory = await newCategory.save();

            res.status(201).json(savedCategory);
        } catch (error) {
            console.error("Error creating category:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    });
};

module.exports = { GetCategories, AddCategory }