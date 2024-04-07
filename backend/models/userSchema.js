import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must contain at least 3 characters"],
        maxlength: [32, "Name cannot exceed 32 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must contain at least 8 characters"],
        maxlength: [13, "Password cannot exceed 13 characters"],
        select: false
    },
    phone: {
        type: Number,
        required: true,
        minlength: [10, "Number must contain at least 10 characters"]
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    education: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Reader", "Author"]
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function() {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES });
};

export const User = mongoose.model("User", userSchema);
