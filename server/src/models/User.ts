import mongoose from "mongoose";
import { generatePasswordHash } from "./../helpers/auth.helper";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "/images/default-profile.png"
    },
    followers: [
        {
            follower: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    follows: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    posts: [],
    savedPosts: [],
    country: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    virtuals: {
        rePassword: {}
    }
});

userSchema.pre("save", async function (next) {
    if (this.password !== this.rePassword) {
        throw new Error("Passwords must match!");
    }

    const hashedPassword = await generatePasswordHash(this.password);

    this.password = hashedPassword;

    next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;