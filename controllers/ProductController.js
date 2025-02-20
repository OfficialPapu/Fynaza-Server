const multer = require('multer');
const { ProductSchema } = require('../models/ProductModel');

const GetProductBySlug = (req, res) => {
    let { Slug } = req.params;
    console.log(Slug);
}

// Set up storage engine
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const AddProduct = (req, res) => {
    
    upload.array("Images", 20)(req, res, (err) => {
        let { SKU, Name, Description, Category, Brand, Price, Discount, Stock, Media, Specifications, ShippingDetails } = req.body;
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
        res.json({ filePaths }
        );
    });

}

module.exports = { GetProductBySlug, AddProduct };