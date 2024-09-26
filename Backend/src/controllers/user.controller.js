import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    console.log("Request Body:", req.body); // Log request body
    console.log("Request File:", req.file); // Log uploaded file info

    // Check if all required fields are present
    if (!name || !email || !password || !address) {
        return res.status(400).json({
            success: false,
            message: "Please enter all the fields"
        });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email"
        });
    }

    // Secure the password with bcrypt
    const securePassword = await bcrypt.hash(password, 10);

    // Check if avatar is uploaded and available in req.file
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload an avatar"
        });
    }

    // Use uploadOnCloudinary to upload the file buffer to Cloudinary
    const avatarUploadResult = await uploadOnCloudinary(req.file.buffer, req.file.originalname);

    // Create new user with Cloudinary avatar URL
    const user = await User.create({
        name,
        email,
        password: securePassword,
        address,
        avatar: avatarUploadResult.secure_url  // Save Cloudinary URL as avatar
    });

    // Return the response with the new user
    res.status(201).json({
        success: true,
        user
    });
});






const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({
            success: false,
            message: "Please enter all fields"
        })
    }
    let user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({
            success: false,
            message: "Please enter correct email "
        })


    }
    const comparingPassword = await bcrypt.compare(password, user.password)
    if (!comparingPassword) {
        res.status(400).json({
            message: "Please enter correct password",
            success: false
        })
    }

    const tokenData = { userId: user._id }
    const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {

        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })

    user = {
        name: user.name,
        email: user.email,
        address: user.address,
        avatar: user.avatar,
        role:user.role
    }
    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,

    }

    res.status(200).cookie("token", token, cookieOptions).json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
        token

    })

})

const Logout = asyncHandler(async (req, res) => {

    const name = req.user?.name

    res.status(200)
        .clearCookie("token", "")
        .json({
            message: `See you soon ${name}`,
            success: true
        });

})


const updateProfile = asyncHandler(async (req, res) => {
    const source = req.body;
const userId = req.user._id;
if (!userId) {
    return res.status(404).json({
        success: false,
        message: "Please Login First"
    });
}

let user = await User.findById(userId);
if (!user) {
    return res.status(404).json({ success: false, message: "no user found" });
}

// Update user fields if provided
if (source.name) user.name = source.name;
if (source.email) user.email = source.email;
if (source.address) user.address = source.address;
if (source.password) {
    user.password = await bcrypt.hash(source.password, 10);
}

// Handle avatar upload if a file is provided
if (req.file) {
    const avatarUploadResult = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
    user.avatar = avatarUploadResult.secure_url; // Save Cloudinary URL as avatar
}

// Save the updated user
await user.save();
res.status(200).json({
    success: true,
    message: "User updated successfully",
    user
});


})
export {
    registerUser,
    Login,
    Logout,
    updateProfile
}