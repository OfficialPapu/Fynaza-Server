const { upload } = require("../config/MulterConfig");
const { getFormattedPath, createSlug } = require("../config/UrlConfig");

const { ProductSchema } = require('../models/ProductModel');

const GetProductBySlug = async (req, res) => {
    try {
        let { Slug } = req.params;
        const product = await ProductSchema.find({ Slug: Slug }).populate('CategoryID', 'CategoryAttribute')
            .populate('BrandID', 'CategoryAttribute');
        res.status(200).json( product );
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const AddProduct = (req, res) => {
    upload.fields([{ name: "Images", maxCount: 20 }, { name: "Videos", maxCount: 10 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        let { SKU, Name, Description, Category, Brand, Price, Discount, Stock, Specifications, ShippingDetails } = req.body;
        const Slug = createSlug(Name);
        const imagePaths = req.files["Images"] ? req.files["Images"].map((file) => getFormattedPath(file.path)) : [];
        const videoPaths = req.files["Videos"] ? req.files["Videos"].map((file) => getFormattedPath(file.path)) : [];
        if (imagePaths.length === 0 && videoPaths.length === 0) {
            return res.status(200).json({ error: "No files uploaded" });
        }

        const NewProduct = new ProductSchema({
            SKU,
            Name,
            Description,
            Slug,
            CategoryID: Category,
            BrandID: "67baf658cebbc38c81a73423",
            Price,
            Discount,
            Stock,
            Specifications,
            ShippingDetails,
            Media: {
                Images: imagePaths.map(url => ({ Url: url })),
                Videos: videoPaths.map(url => ({ Url: url }))
            }
        });

        const SaveProduct = await NewProduct.save();
        res.json({ SaveProduct });
    });

}

const TiptapMediaUpload = (req, res) => {
    upload.array("WysiwygImages")(req, res, async (err) => {
        try {
            if (!req.files) {
                return res.status(400).json({ error: "No files uploaded" });
            }
            const urls = req.files.map((file) => process.env.BASE_IMAGES_PATH + getFormattedPath(file.path));
            res.json({ success: true, urls });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    )
}

const GetProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find().populate('CategoryID', 'CategoryAttribute').populate('BrandID', 'CategoryAttribute');
        if (products.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { GetProductBySlug, AddProduct, TiptapMediaUpload, GetProducts };