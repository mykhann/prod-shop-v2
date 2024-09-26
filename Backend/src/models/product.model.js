import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        maxlength: [8, 'Price cannot exceed 8 characters'],
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity:{
        type: Number,
        default: 1
    },
    soldItems: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }

    },
    category: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    avatars: [{ type: String }],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],

}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
