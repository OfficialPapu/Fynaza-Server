const express = require('express');
const { GetCategories, AddCategory } = require('../controllers/CategoryController');
const CategoryRouter = express.Router();

CategoryRouter.get("/", GetCategories);
CategoryRouter.post("/add", AddCategory);

module.exports = { CategoryRouter }