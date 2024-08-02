import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { BsFiletypePng } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import ProfilePicture from "../../shared/components/ProfilePicture/ProfilePicture";
import FormErrorMessage from "../../shared/components/FormErrorMessage/FormErrorMessage";
import { allowedImageMimeTypes } from "../../shared/constants/allowed-files.constant";
import Loader from "../../shared/components/Loader/Loader";

export default function CreatePost() {
  const [error, setError] = useState();
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const onCreate = async (data) => {
    console.log(data);
  };

  const onImageUpload = (event) => {
    const files = event.target.files;
    const file = files[files.length - 1];
    if (!allowedImageMimeTypes.includes(file.type)) {
      // Show message
      return setError("Invalid file type. Only images allowed")
    }
    // Visualize image
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      setImage(readerEvent.target?.result)
    }
    setError(null);
    setValue('imageUri', file);
  };

  const onImageRemove = () => {
    setValue("imageUri", undefined);
    setImage(undefined);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="grow flex justify-center items-center mb-10 sm:mb-0">
        <form
          onSubmit={handleSubmit(onCreate)}
          className="block w-[65%] grow lg:grow-0 2xl:w-[600px] shrink p-6"
        >
          <Link to="/" className="text-2xl">
            <FaXmark />
          </Link>
          <div className="w-full flex mt-8">
            <ProfilePicture
              imageUrl={user?.profilePicture}
              className="w-12 h-12"
            />
            <h2 className="my-auto mx-4 text-xl font-bold">
              <span className="text-mainGreen">@</span>
              {user?.username}
            </h2>
            <p className="hidden sm:inline-block my-auto text-sm text-slate-400">
              Create New Post
            </p>
          </div>

          <div className="relative mt-10">
            <label
              htmlFor="description"
              className="absolute text-sm -translate-y-3 bg-mainWhite ms-4 focus:scale-75"
            >
              What is on your mind?
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              {...register("description")}
              className="py-2 px-3 border rounded-lg bg-transparent w-full ring-1 ring-mainGreen outline-none"
            ></textarea>
          </div>

          {/* Upload photo field */}
          {!image && <div className="col-span-full mt-8">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {/* <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" /> */}
                <BsFiletypePng className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-mainGreen"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => onImageUpload(e)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>}

          {/* Uploaded photo visualizer */}
          {image && <div className="col-span-full mt-8">
            <div className="relative w-full overflow-hidden max-h-max rounded-lg border-2 border-dashed border-gray-900/25">
              <button className="absolute top-0 right-0 p-4" onClick={() => onImageRemove()}>
                <MdDelete className="text-3xl text-red-700"/>
              </button>
              <img 
                src={image} 
                className="w-full h-max"
                alt="Uploaded picture" />
            </div>
          </div>}

          <div className="flex justify-end items-center mt-8">
            <Link to="/" className="mx-4 text-sm">
              Cancel
            </Link>
            <button className="bg-mainGreen text-white py-1.5 px-10 text-sm rounded-lg">
              Post
            </button>
          </div>
          {error && <FormErrorMessage className="text-center" message={error} />}
        </form>
      </div>
    </>
  );
}
