/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

import moment from "moment";

import { AiOutlineComment } from "react-icons/ai";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { PiShareFat } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import PostContext from "../../../../entities/posts/contexts/post.context";
import {
  useDislikePost,
  useLikePost,
  useSavePost,
  useUnsavePost,
} from "../../../../entities/posts/hooks/usePost";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import MessageToast from "../../../../shared/components/MessageToast/MessageToast";

export default function PostStats() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showCopiedLink, setShowCopiedLink] = useState(false);

  const user = useSelector((state) => state.user);

  const { post, onLike, onDislike, onSave, onUnsave } = useContext(PostContext);

  const like = useLikePost();
  const dislike = useDislikePost();
  const save = useSavePost();
  const unsave = useUnsavePost();

  const handleLikeButton = async () => {
    setIsLoading(true);
    onLike(user._id);
    try {
      await like(post?._id);
    } catch (error) {
      setError("Error: Could not like");
      onDislike(user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeButton = async () => {
    setIsLoading(true);
    onDislike(user._id);
    try {
      await dislike(post?._id);
    } catch (error) {
      setError("Error: Could not dislike");
      onLike(user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    onSave(user._id);
    try {
      await save(post?._id);
    } catch (error) {
      setError("Error: Could not save");
      onUnsave(user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsaveButton = async () => {
    setIsLoading(true);
    onUnsave(user._id);
    try {
      await unsave(post?._id);
    } catch (error) {
      setError("Error: Could not unsave");
      onSave(user._id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareButton = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopiedLink(true);
  }

  const closeCopiedLinkPopup = () => setShowCopiedLink(false);

  return (
    <> 
      {showCopiedLink && 
      <div className="absolute w-full left-0">
        <MessageToast close={closeCopiedLinkPopup} message="Link copied."/>
      </div>}
      <div className="block grow-0 border-b py-3 relative">
        {error && <ErrorToast error={error} setError={setError}/>}
        {/* Action buttons */}
        <div className="w-full flex justify-around align-middle px-4">
          <div className="flex grow justify-start items-center">
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
            <label htmlFor="commentInput">
              <AiOutlineComment className="ms-4 text-3xl cursor-pointer" />
            </label>
            <PiShareFat onClick={() => handleShareButton()} className="ms-4 text-3xl cursor-pointer" />
          </div>
          <div className="flex grow justify-end items-center">
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
        {/* Post Analytics */}
        <div className="ms-4 mt-2">
          <p className="text-sm sm:text-base font-bold">
            {post?.likedBy?.length} likes
          </p>
          <p className="text-xs opacity-70">
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
        {/* Post Description - Mobile only */}
        {post?.description && (
          <div className="ms-4 mt-2 pe-4 sm:hidden">
            <p className="text-[13px]">
              <span className="font-bold me-2">{post?.creator?.username}</span>
              {post?.description}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
