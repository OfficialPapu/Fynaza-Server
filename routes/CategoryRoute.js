const express = require('express');
const { GetMainCategorie, CreateMainCategory } = require('../controllers/CategoryController');
const MainCategoryRouter = express.Router();

// MainCategory
MainCategoryRouter.get("/", GetMainCategorie);
MainCategoryRouter.post("/create", CreateMainCategory);

module.exports = { MainCategoryRouter }