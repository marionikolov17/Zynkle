import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

export default upload;