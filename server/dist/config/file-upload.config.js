"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const allowedImageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/webp',
    'image/heif',
    'image/heic',
];
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: function (req, file, cb) {
        if (!allowedImageMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only images are allowed"));
        }
        cb(null, true);
    },
});
exports.default = upload;
//# sourceMappingURL=file-upload.config.js.map