/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import useLikeReply from "../../../../../entities/replies/hooks/useLikeReply";

import PostContext from "../../../../../entities/posts/contexts/post.context";

import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ProfilePicture from "../../../../../shared/components/ProfilePicture/ProfilePicture";
import useDislikeReply from "../../../../../entities/replies/hooks/useDislikeReply";
import ConfirmBlock from "../../ConfirmBlock/ConfirmBlock";
import useDeleteReply from "../../../../../entities/replies/hooks/useDeleteReply";
import ErrorToast from "../../../../../shared/components/ErrorToast/ErrorToast";

export default function Reply({ reply, setReplies, setTotalReplies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

  const user = useSelector((state) => state.user);

  const { post } = useContext(PostContext);

  const { likeReply, onLikeReply } = useLikeReply();
  const { dislikeReply, onDisikeReply } = useDislikeReply();

  const { deleteReply, onDeleteReply } = useDeleteReply();

  const handleLikeReply = async () => {
    setIsLoading(true);
    try {
      await likeReply(reply?._id);
      onLikeReply(setReplies, reply?._id, user._id);
    } catch (error) {
      console.log("reply like", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeReply = async () => {
    setIsLoading(true);
    try {
      await dislikeReply(reply?._id);
      onDisikeReply(setReplies, reply?._id, user._id);
    } catch (error) {
      console.log("reply dislike", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReply = async () => {
    setIsLoading(true);
    try {
      await deleteReply(post?._id, reply?._id);

      onDeleteReply(setReplies, reply?._id);

      setTotalReplies((currentValue) => currentValue - 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {error && <ErrorToast text={error} />}
      {showConfirm && (
        <ConfirmBlock
          handler={handleDeleteReply}
          cancel={onCancelDelete}
        />
      )}
      {isLoading && (
        <div className="flex w-full justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div
        className={!showConfirm ? "flex w-full ps-6 sm:ps-12 my-4" : "hidden"}
      >
        {" "}
        {/* flex */}
        <div className="ps-6">
          {" "}
          {/* Reply Owner Image */}
          <ProfilePicture
            imageUrl={reply?.creator?.profilePicture}
            className="w-10 h-10"
          />
        </div>
        <div className="block grow ms-3">
          {/* Owner username */}
          <h3 className="text-sm font-bold">
            <span className="text-mainGreen">@</span>
            {reply?.creator?.username}
          </h3>
          {/* Reply text content */}
          <p className="text-[13px] sm:text-sm">{reply?.text}</p>
          {/* Reply buttons */}
          <div className="flex mt-2">
            <p className="text-xs lg:text-sm opacity-70">
              {moment(reply?.createdAt).fromNow()}
            </p>
            <p className="text-xs lg:text-sm ms-4 cursor-pointer">
              {reply?.likedBy?.length} likes
            </p>
            {(reply?.creator?._id == user._id ||
              post?.creator?._id == user._id) && (
              <button
                className="text-xs lg:text-sm ms-4"
                onClick={() => setShowConfirm(true)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <div className="p-3">
          {reply?.likedBy?.includes(user._id) ? (
            <FaHeart
              className="text-lg cursor-pointer text-mainGreen"
              onClick={() => handleDislikeReply()}
            />
          ) : (
            <CiHeart
              className="text-xl cursor-pointer"
              onClick={() => handleLikeReply()}
            />
          )}
        </div>
      </div>
    </>
  );
}
