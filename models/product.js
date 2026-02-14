import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "General"
    },
    dimension: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    material: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;