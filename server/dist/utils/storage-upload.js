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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToCloud = void 0;
const storage_1 = require("firebase/storage");
const storage = (0, storage_1.getStorage)();
const uploadFileToCloud = (file) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload file and metadata to the object
    const storageRef = (0, storage_1.ref)(storage, Date.now() + "-" + file.originalname);
    const fileBlob = new Blob([file.buffer]);
    const uploadTask = (0, storage_1.uploadBytesResumable)(storageRef, fileBlob);
    // Listen for state changes, errors, and completion of the upload.
    return new Promise((resolve, reject) => {
        uploadTask.on("state_changed", (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
            }
        }, (error) => {
            reject(error);
            switch (error.code) {
                case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;
                case "storage/canceled":
                    // User canceled the upload
                    break;
                case "storage/unknown":
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, () => {
            // Upload completed successfully, now we can get the download URL
            (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        });
    });
});
exports.uploadFileToCloud = uploadFileToCloud;
//# sourceMappingURL=storage-upload.js.map