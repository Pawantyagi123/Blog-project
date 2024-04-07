import { catchAsync } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import { sendToken } from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';


export const register = catchAsync(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar Required", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(new ErrorHandler("Invalid image formate. please use jpge,png,or jpg formate", 400)
        );
    }

    const { name, email, password, phone, role, education } = req.body;

    // Check if all required fields are provided
    if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !role ||
        !education ||
        !avatar) {
        return next(new ErrorHandler("Please provide all details", 400));
    }

    // Check if user with provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("cloudinary error:", cloudinaryResponse.error || "unknown cloudinary error!")
    }

    // Create a new user
    const user = await User.create({
        name, email, password, phone, role, education, avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url

        }
    });

    // Send JWT token in response
    sendToken(user, 201, "User registered successfully", res);
});


//login codes

export const login = catchAsync(async (req, res, next) => {
    const { email, password, role } = req.body;

    // Check if email, password, and role are provided
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please enter valid data", 400));
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    // Verify password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    // Check if user's role matches provided role
    if (user.role !== role) {
        return next(new ErrorHandler(`User with provided role ${role} not found`, 400));
    }

    // Send JWT token in response
    sendToken(user, 200, "User logged in successfully", res);
});



//logout function
export const logout = catchAsync((req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "User logged out!"
    });
});


//profile
export const getMyProfile = catchAsync((req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
})



export const getAllAuthors = catchAsync(async (req, res, next) => {
    const authors = await User.find({ role: "Author" });
    res.status(200).json({
        success: true,
        authors,
    });

});
