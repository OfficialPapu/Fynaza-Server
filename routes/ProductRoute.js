const express = require('express');
const { GetProductBySlug, AddProduct, TiptapMediaUpload } = require('../controllers/ProductController');
const ProductRouter = express.Router();
ProductRouter.get("/:Slug", GetProductBySlug);
ProductRouter.post("/add", AddProduct);
ProductRouter.post("/tiptap/upload", TiptapMediaUpload);
module.exports = { ProductRouter };