import { useNavigate } from "react-router-dom";
import ProfilePicture from "./../../components/ProfilePicture/ProfilePicture";
import { CiBookmark, CiGrid41 } from "react-icons/ci";
import ProfilePost from "../../features/profile/components/ProfilePost/ProfilePost";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <div className="grow flex justify-center">
        <div className="block w-[65%] 2xl:w-1/2 grow lg:grow-0 shrink sm:mb-0 mb-10">
          {/* Profile Info Container */}
          <div className="flex flex-col sm:flex-row w-full h-max p-6">
            {/* Profile Image Section */}
            <div className="flex justify-center shrink grow sm:grow sm:p-4">
              <ProfilePicture className="w-20 h-20 sm:w-24 sm:h-24" />
              <h3 className="sm:hidden text-lg ms-4 my-auto">
                <span className="text-mainGreen">@</span>marionikolov17
              </h3>{" "}
              {/* Username - mobile */}
            </div>

            {/* Profile Info Section - Desktop*/}
            <div className="block grow p-4">
              <h3 className="hidden sm:block text-lg ms-4 mb-2">
                <span className="text-mainGreen">@</span>marionikolov17
              </h3>{" "}
              {/* Username */}
              <div className="w-full flex justify-center sm:justify-start">
                {" "}
                {/* Stats */}
                <p className="sm:text-lg mx-4">
                  <b>22</b> Posts
                </p>
                <p className="sm:text-lg ms-4 me-0 sm:mx-4">
                  <b>2,500</b> Followers
                </p>
                <p className="sm:text-lg mx-4">
                  <b>734</b> Following
                </p>
              </div>
              <p className="text-lg sm:ms-4 mt-8 font-bold">Mario Nikolov</p>{" "}
              {/* Name */}
              <p className="text-sm sm:text-base sm:ms-4 mt-1">
                Doing everything with passion! Follow for more.
              </p>{" "}
              {/* Description */}
              {/* Action Buttons */}
              <button
                className="sm:ms-4 mt-8 rounded-sm border border-black px-6 py-2"
                onClick={() => navigate("/profile/edit")}
              >
                Edit Profile
              </button>
              <button className="sm:ms-4 mt-8 rounded-sm border border-red-600 text-red-600 px-6 py-2 ms-2">
                Log out
              </button>
              {/* <button className="ms-4 mt-8 rounded-sm bg-mainGreen text-white px-6 py-2">Follow</button> */}
              {/* <button className="ms-4 mt-8 rounded-sm border border-mainGreen text-mainGreen px-6 py-2">Unfollow</button> */}
            </div>
          </div>

          {/* Profile Select Buttons */}
          <div className="flex mt-2 sm:mt-8 w-full justify-center border-t">
            <button className="mx-6 py-2 text-lg profile-select-button flex items-center justify-center profile-select-hover">
              <CiGrid41 className="me-2" /> Posts
            </button>
            <button className="mx-6 py-2 text-lg flex items-center justify-center profile-select-hover">
              <CiBookmark className="me-2" /> Saved
            </button>
          </div>

          {/* Profile Content */}
          <div className="w-full grid grid-cols-3 mt-1">
            {/* Profile Posts */}
            {/* Profile Saved - Private only */}
            <ProfilePost />
            {/* <p>User has not published anything, yet.</p> */}{" "}
            {/* No Posts Message */}
            {/* <p>You have not saved any posts, yet.</p> */}{" "}
            {/* No Saved Posts Message */}
          </div>
        </div>
      </div>
    </>
  );
}
