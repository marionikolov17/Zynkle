import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfilePicture from "../../shared/components/ProfilePicture/ProfilePicture";
import { useGetProfile } from "../../entities/users/hooks/useProfile";
import { useSelector } from "react-redux";
import Loader from "../../shared/components/Loader/Loader";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

export default function ProfileEdit() {
  const currentUser = useSelector((state) => state.user);
  const { user, isLoading } = useGetProfile(currentUser._id);
  const [currentProfilePicture, setCurrentProfilePicture] = useState();
  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm()

  const onUpdate = async (data) => {
    console.log(data);
  }

  const onImageUpload = (event) => {
    const files = event.target.files;
    const file = files[files.length - 1];
    if (!allowedImageMimeTypes.includes(file.type)) {
      // Show message
      setImageError("Invalid file type. Only images allowed")
      return;
    }
    // Visualize image
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      setCurrentProfilePicture(readerEvent.target?.result)
    }
    setImageError(null);
    setValue('profilePicture', file);
  }

  return (
    <>
      {isLoading && <Loader />}
      <main className="min-h-full max-h-max w-full absolute overflow-x-hidden overflow-y-scroll bg-mainWhite flex justify-center no-scrollbar">
        <form className="p-6" onSubmit={handleSubmit(onUpdate)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <Link to="/profile" className="text-2xl">
                <IoMdArrowRoundBack />
              </Link>
              <h2 className="mt-4 text-base font-semibold leading-7 text-gray-900">
                Edit Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                      <input
                        id="username"
                        {...register("username", { required: "This field is required" })}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      {...register("description", { required: "This field is required" })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {/* <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" /> */}
                    <ProfilePicture imageUrl={currentProfilePicture} className="w-12 h-12" />
                    <label
                      htmlFor="profilePicture"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </label>
                    <input 
                      type="file" 
                      className="hidden" 
                      name="profilePicture"
                      onChange={(e) => onImageUpload(e)}
                      id="profilePicture" 
                    />
                  </div>
                {imageError && <p className="text-sm mt-4 text-red-600">{imageError}</p>}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      {...register("firstName", { required: "This field is required" })}
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      {...register("lastName", { required: "This field is required" })}
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", { required: "This field is required" })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link
              to="/profile"
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-mainGreen px-3 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
