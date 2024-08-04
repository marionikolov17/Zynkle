/* eslint-disable react/prop-types */
import moment from "moment";

import { CiHeart, CiBookmark } from "react-icons/ci";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa";

export default function HomePost({ post, innerRef }) {
  const [imageLoading, setImageLoading] = useState(true);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLikeButton = async () => {}

  const handleDislikeButton = async () => {}

  const handleSaveButton = async () => {}

  const handleUnsaveButton = async () => {}

  return (
    <div
      ref={innerRef}
      className="w-full flex justify-center mt-1 mb-0 sm:mt-3 sm:mb-5"
    >
      <div className="w-[600px] shrink sm:border sm:rounded-lg block py-3 sm:py-4">
        {/* Author's info */}
        <div className="w-full flex align-middle px-4">
          <ProfilePicture
            imageUrl={post?.creator?.profilePicture}
            profileId={post?.creator?._id}
            className="w-10 h-10"
          />
          <p className="my-auto mx-2 font-bold">{post?.creator?.username}</p>
          <p className="my-auto text-sm opacity-60">
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
        {/* Description */}
        {post?.description && (
          <div className="mt-2 sm:mt-4 px-4">
            <p className="text-sm sm:text-base">{post?.description}</p>
          </div>
        )}
        {/* Image */}
        <div
          className={
            !imageLoading
              ? "w-full max-h-max mt-2 sm:mt-4 p-0 sm:px-4"
              : "w-full h-[350px] mt-2 sm:mt-4 p-0 sm:px-4 skeleton-loading"
          }
        >
          <img
            className="object-cover cursor-pointer"
            src={post?.imageUri}
            onLoad={() => setImageLoading(false)}
            onClick={() => navigate(`/post/${post?._id}`)}
            alt=""
          />
        </div>
        {/* Action buttons */}
        <div className="w-full flex justify-around align-middle mt-2 sm:mt-4 px-4">
          <div className="flex grow justify-start">
            {!post?.likedBy?.includes(user._id) ? (
              <CiHeart
                className="text-3xl cursor-pointer"
                onClick={() => handleLikeButton()}
              />
            ) : (
              <FaHeart
                className="text-2xl cursor-pointer text-mainGreen"
                onClick={() => handleDislikeButton()}
              />
            )}
            <Link to={`/post/${post?._id}`}>
              <AiOutlineComment className="ms-4 text-3xl cursor-pointer" />
            </Link>
            <PiShareFat className="ms-4 text-3xl cursor-pointer" />
          </div>
          <div className="flex grow justify-end">
          {post?.savedBy?.includes(user._id) ? (
              <FaBookmark
                className="text-2xl text-black cursor-pointer"
                onClick={() => handleUnsaveButton()}
              />
            ) : (
              <CiBookmark
                className="text-3xl cursor-pointer"
                onClick={() => handleSaveButton()}
              />
            )}
          </div>
        </div>
        {/* Post Stats */}
        <div className="mt-2 block px-4">
          <p className="text-sm font-bold">{post?.likedBy?.length} likes</p>
          <Link to={`/post/${post?._id}`} className="text-sm mt-1 opacity-50">
            View all {post?.comments?.length} comments
          </Link>
        </div>
      </div>
    </div>
  );
}
