"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const auth_helper_1 = require("./../helpers/auth.helper");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        default: "/images/default-profile.png",
    },
    followers: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    follows: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    posts: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Post"
        }
    ],
    savedPosts: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Post"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    virtuals: {
        rePassword: {},
    },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password !== this.rePassword) {
            throw new Error("Passwords must match!");
        }
        const hashedPassword = yield (0, auth_helper_1.generatePasswordHash)(this.password);
        this.password = hashedPassword;
        next();
    });
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
