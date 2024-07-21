import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage();

export const uploadFileToCloud = async (file: Express.Multer.File) => {
  // Upload file and metadata to the object
  const storageRef = ref(storage, Date.now() + "-" + file.originalname as string);
  const fileBlob = new Blob([file.buffer]);
  const uploadTask = uploadBytesResumable(storageRef, fileBlob);

  // Listen for state changes, errors, and completion of the upload.
  return new Promise((resolve, reject) => {
    uploadTask.on(
        "state_changed",
        (snapshot) => {
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
        },
        (error) => {
          reject(error)
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
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
  })
};
