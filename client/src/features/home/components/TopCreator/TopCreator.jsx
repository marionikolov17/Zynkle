/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";

export default function TopCreator({ creator }) {
  const user = useSelector((state) => state.user);

  return (
    <div className="px-6 my-5 flex justify-around">
      <div className="flex grow justify-start">
        <ProfilePicture
          className="w-12 h-12"
          imageUrl={creator?.profilePicture}
        />
        <div className="block ms-2">
          <Link className="my-auto text-sm font-bold">{creator?.username}</Link>
          <p className="my-auto text-sm opacity-60">
            {creator?.firstName + " " + creator?.lastName}
          </p>
        </div>
      </div>
      <div className="flex shrink justify-end items-center pe-4">
        {creator?.followers?.includes(user._id) ? (
          <button className="bg-mainGreen text-white rounded-lg py-2 px-8 h-max hidden 2xl:flex">
            Unfollow
          </button>
        ) : (
          <>
            {creator._id != user._id ? (
              <button className="bg-mainGreen text-white rounded-lg py-2 px-8 h-max hidden 2xl:flex">
                Follow
              </button>
            ) : (
              <Link to="/profile/edit" className="text-white rounded-lg py-2 px-8 h-max hidden 2xl:flex bg-slate-400">Edit</Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
