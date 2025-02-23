const express = require('express');
const ProductRouter = express.Router();
const { GetProductBySlug, AddProduct, TiptapMediaUpload, GetProducts } = require('../controllers/ProductController');
ProductRouter.get("/:Slug", GetProductBySlug);
ProductRouter.post("/add", AddProduct);
ProductRouter.post("/tiptap/upload", TiptapMediaUpload);
ProductRouter.get("/", GetProducts);
module.exports = { ProductRouter };