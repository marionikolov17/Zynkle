/* eslint-disable no-unused-vars */
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
import {
  useDislikePost,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from "../../../../entities/posts/hooks/usePost";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import MessageToast from "../../../../shared/components/MessageToast/MessageToast";

export default function HomePost({
  post,
  innerRef,
  onLike,
  onDislike,
  onSave,
  onUnsave,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [showCopiedLink, setShowCopiedLink] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const like = useLikePost();
  const dislike = useDislikePost();
  const save = useSavePost();
  const unsave = useUnsavePost();

  const handleLikeButton = async () => {
    setIsLoading(true);
    onLike(post?._id, user._id);
    try {
      await like(post?._id);
    } catch (error) {
      setError("Error: Could not like");
      onDislike(post?._id, user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeButton = async () => {
    setIsLoading(true);
    onDislike(post?._id, user._id);
    try {
      await dislike(post?._id);
      onDislike(post?._id, user._id);
    } catch (error) {
      setError("Error: Could not dislike");
      onLike(post?._id, user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    onSave(post?._id, user._id);
    try {
      await save(post?._id);
    } catch (error) {
      setError("Error: Could not save");
      onUnsave(post?._id, user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsaveButton = async () => {
    setIsLoading(true);
    onUnsave(post?._id, user._id);
    try {
      await unsave(post?._id);
    } catch (error) {
      setError("Error: Could not unsave");
      onSave(post?._id, user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareButton = () => {
    const sharedUrl = window.location.href + `post/${post?._id}`;
    navigator.clipboard.writeText(sharedUrl);
    setShowCopiedLink(true);
  }

  const closeCopiedLinkPopup = () => setShowCopiedLink(false);

  return (
    <>
      {error && <ErrorToast error={error} setError={setError}/>}
      <div
        ref={innerRef}
        className="w-full flex justify-center mt-0 mb-0 sm:mt-3 sm:mb-5"
      >
        {showCopiedLink && <MessageToast message="Link copied." close={closeCopiedLinkPopup}/>}
        <div className="w-[600px] bg-white shrink sm:border sm:rounded-lg block py-3 sm:py-4">
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
          <div className="p-0 sm:px-4">
            <div
              className={
                !imageLoading
                  ? "w-full max-h-[500px] mt-2 sm:mt-4 overflow-hidden"
                  : "w-full h-[350px] mt-2 sm:mt-4 skeleton-loading"
              }
            >
              <img
                className="object-cover w-full cursor-pointer"
                src={post?.imageUri}
                onLoad={() => setImageLoading(false)}
                onClick={() => navigate(`/post/${post?._id}`)}
                style={{ transform: `scale(${post?.scale})`, translate: `${post?.translateX}px ${post?.translateY}px` }}
                alt=""
              />
            </div>
          </div>
          {/* Action buttons */}
          <div className="w-full flex justify-around align-middle mt-2 sm:mt-4 px-4 relative">
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
              <PiShareFat onClick={() => handleShareButton()} className="ms-4 text-3xl cursor-pointer" />
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
            {post?.comments?.length > 0 && (
              <Link
                to={`/post/${post?._id}`}
                className="text-sm mt-1 opacity-50"
              >
                View all {post?.comments?.length} comments
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
