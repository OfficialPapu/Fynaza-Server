const express = require('express');
const { GetProductBySlug, AddProduct } = require('../controllers/ProductController');
const ProductRouter = express.Router();
ProductRouter.get("/:Slug", GetProductBySlug);
ProductRouter.post("/add", AddProduct);
module.exports = { ProductRouter };