/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";
import { useFollowProfile, useUnfollowProfile } from "../../../../entities/users/hooks/useProfile";
import { useState } from "react";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";

export default function TopCreator({ creator }) {
  const [error, setError] = useState(null);
  const [followers, setFollowers] = useState(creator?.followers || []);

  const user = useSelector((state) => state.user);

  const follow = useFollowProfile();
  const unfollow = useUnfollowProfile();

  const onFollow = async () => {
    try {
      await follow(creator?._id);
      setFollowers(currentFollowers => {
        return [...currentFollowers, user._id];
      })
    } catch (error) {
      setError("An error occured")
    } 
  }

  const onUnfollow = async () => {
    try {
      await unfollow(creator._id);
      setFollowers(currentFollowers => {
        let newFollowers = currentFollowers.filter(id => id != user._id);
        return newFollowers;
      })
    } catch (error) {
      setError("An error occured")
    } 
  }

  return (
    <>
      {error && <ErrorToast text={error}/>}
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
          {followers?.includes(user._id) ? (
            <button className="border border-mainGreen text-mainGreen rounded-lg py-2 px-8 h-max hidden 2xl:flex" onClick={onUnfollow}>
              Unfollow
            </button>
          ) : (
            <>
              {creator._id != user._id ? (
                <button className="bg-mainGreen text-white rounded-lg py-2 px-8 h-max hidden 2xl:flex" onClick={onFollow}>
                  Follow
                </button>
              ) : (
                <Link to="/profile/edit" className="rounded-lg py-2 px-8 h-max hidden 2xl:flex border border-black">Edit</Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
