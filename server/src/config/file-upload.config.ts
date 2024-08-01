import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/webp',
  'image/heif',
  'image/heic',
]

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    if (!allowedImageMimeTypes.includes(file.mimetype)) {
        return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
