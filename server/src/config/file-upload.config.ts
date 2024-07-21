import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

export default upload;