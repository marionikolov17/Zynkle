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

export default function PostStats() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user);

  const { post, onLike, onDislike, onSave, onUnsave } = useContext(PostContext);

  const like = useLikePost();
  const dislike = useDislikePost();
  const save = useSavePost();
  const unsave = useUnsavePost();

  const handleLikeButton = async () => {
    setIsLoading(true);
    try {
      await like(post?._id);
      onLike(user._id);
    } catch (error) {
      setError("Error: Could not like");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeButton = async () => {
    setIsLoading(true);
    try {
      await dislike(post?._id);
      onDislike(user._id);
    } catch (error) {
      setError("Error: Could not dislike");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveButton = async () => {
    setIsLoading(true);
    try {
      await save(post?._id);
      onSave(user._id);
    } catch (error) {
      setError("Error: Could not save");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsaveButton = async () => {
    setIsLoading(true);
    try {
      await unsave(post?._id);
      onUnsave(user._id);
    } catch (error) {
      setError("Error: Could not unsave");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="block grow-0 border-b py-3 relative">
        {isLoading && 
          <div className="absolute w-full flex justify-center z-50">
            <div className="loader"></div>
          </div>
        }
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
            <PiShareFat className="ms-4 text-3xl cursor-pointer" />
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
