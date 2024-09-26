import { response } from "express";
import { Product } from "../models/product.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


// Admin will create product 
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields"
        });
    }
    
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(404).json({
            success: false,
            message: "Please upload a picture of the product"
        });
    }
    
    // Upload the image to Cloudinary using the file buffer
    const avatarUploadResult = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
    
    if (!avatarUploadResult) {
        return res.status(404).json({
            success: false,
            message: "Something went wrong uploading the avatar"
        });
    }
    
    const product = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        avatar: avatarUploadResult.secure_url 
    });
    
 
    res.status(201).json({
        success: true,
        product
    });
    

    const products = await Product.create({
        name,
        description,
        price,
        stock,
        avatars: avatars?.url,
        category
    });

    res.status(200).json({
        success: true,
        products
    });
});


// Get Product By ID 
const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ success: false, message: "no product found" });
    };
    res.status(200).json({ success: true, product });
});

// Get All Products 
const getAllProducts = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        res.status(404).json({ success: false, message: "please login first" });
    };
    const products = await Product.find();
    res.status(200).json({ success: true, products });

});
// admin will update the product 
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const info = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }
    
    // Update product fields based on the info received
    if (info.name) product.name = info.name;
    if (info.description) product.description = info.description;
    if (info.price) product.price = info.price;
    if (info.stock) product.stock = info.stock;
    if (info.category) product.category = info.category;
    
    // Check if a new file is uploaded
    if (req.file) {
        const avatarUploadResult = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
        
        if (!avatarUploadResult) {
            return res.status(404).json({
                success: false,
                message: "Something went wrong uploading the avatar",
            });
        }
            product.avatar = avatarUploadResult.secure_url; 
    }
    
    // Save the updated product
    await product.save();
    
    res.status(200).json({
        success: true,
        product,
    });
    
});

// Admin will delete the product 
const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        res.status(404).json({
            success: false,
            message: 'Product not found',

        });
    };
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
});

export {
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts
};