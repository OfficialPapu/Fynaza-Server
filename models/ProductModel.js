const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    SKU: { type: String, required: true, unique: true },
    Name: { type: String, required: true, trim: true },
    Slug: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Category: { type: String, required: true },
    Brand: { type: String },
    Price: { type: Number, required: true },
    Discount: {
        Percentage: { type: Number, default: 0 },
        ValidUntil: { type: Date }
    },
    Stock: {
        Quantity: { type: Number, required: true },
        Threshold: { type: Number, default: 10 }
    },
    Media: {
        Images: [
            {
                Url: { type: String, required: true },
            }
        ],
        Videos: [
            {
                Url: { type: String, required: true },
            }
        ]
    },
    Specifications: {
        Color: { type: String },
        Size: { type: String },
        Weight: { type: String },
        CustomAttributes: [
            {
                Key: { type: String, required: true },
                Value: { type: String, required: true }
            }
        ]
    },
    ShippingDetails: {
        Weight: { type: Number },
        Dimensions: {
            Length: { type: Number },
            Width: { type: Number },
            Height: { type: Number }
        }
    },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
    Status: { type: String, enum: ['Active', 'Inactive', 'Discontinued'], default: 'Active' }
});

// Middleware to update UpdatedAt before save
ProductSchema.pre('save', function (next) {
    this.UpdatedAt = Date.now();
    next();
});

module.exports = {
    ProductSchema: mongoose.model('Product', ProductSchema, 'products'),
};