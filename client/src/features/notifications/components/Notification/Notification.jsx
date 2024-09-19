/* eslint-disable react/prop-types */
import moment from "moment";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";

export default function Notification({ notification }) {
  console.log(notification?.createdAt);
  return (
    <>
      <div className="w-full mt-3 sm:mt-2 flex items-center overflow-x-hidden sm:hover:bg-white sm:hover:shadow sm:hover:rounded-lg sm:p-2 transition duration-300">
        <div className="shrink-0">
          <ProfilePicture
            className="w-10 h-10"
            imageUrl={notification?.actorId?.profilePicture}
            profileId={notification?.actorId?._id}
          />
        </div>
        <div className="grow ms-4 cursor-pointer">
          <p className="sm:text-base text-sm">
            <span className="text-mainGreen">@</span>
            <span className="font-bold me-1">
              {notification?.actorId?.username}
            </span>
            {notification?.message}{" "}
            <span className="ms-1 text-sm text-slate-400">
              {moment(notification?.createdAt).fromNow()}
            </span>
          </p>
        </div>
        {/* Type of action */}
        {/* Liked post */}
        {notification?.type == "follow" ? (
          <div></div>
        ) : (
          <div className="w-14 h-12 ms-4 overflow-hidden flex rounded cursor-pointer">
            <img
              className="object-cover"
              src={notification?.targetId?.imageUri}
              alt="post picture"
            />
          </div>
        )}
      </div>
    </>
  );
}
