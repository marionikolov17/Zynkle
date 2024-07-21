import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg") {
        return cb(new Error("Only JPG images are allowed"));
    }
    cb(null, true);
  },
});

export default upload;
