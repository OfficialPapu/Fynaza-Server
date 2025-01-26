const mongoose = require("mongoose")
const MainCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const SubCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
    MainCategorySchema: mongoose.model("MainCategory", MainCategorySchema),
    SubCategorySchema: mongoose.model("SubCategory", SubCategorySchema)
};
