/* eslint-disable react/prop-types */
import moment from "moment";

import { CiHeart } from "react-icons/ci";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";
// eslint-disable-next-line no-unused-vars
import ReplyForm from "./ReplyForm/ReplyForm";
import Reply from "./Reply/Reply";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import PostContext from "../../../../entities/posts/contexts/post.context";
import {
  useDislikeComment,
  useLikeComment,
} from "../../../../entities/comments/hooks/useComments";
import { FaHeart } from "react-icons/fa";
import Loader from "../../../../shared/components/Loader/Loader";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";

export default function Comment({ comment }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user);

  const { post, onLikeComment, onDislikeComment } = useContext(PostContext);

  const likeComment = useLikeComment();
  const dislikeComment = useDislikeComment();

  const handleLikeComment = async () => {
    setIsLoading(true);
    try {
      await likeComment(comment?._id);
      onLikeComment(comment?._id, user._id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislikeComment = async () => {
    setIsLoading(true);
    try {
      await dislikeComment(comment?._id);
      onDislikeComment(comment?._id, user._id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorToast text={error} />}
      <div className="block">
        {/* Comment */}
        <div className="w-full max-h-max flex py-4">
          <div className="ps-6">
            {" "}
            {/* Comment Owner Image */}
            <ProfilePicture
              imageUrl={comment?.creator?.profilePicture}
              className="w-10 h-10"
            />
          </div>
          <div className="block grow ms-3">
            {/* Owner username */}
            <h3 className="text-sm font-bold">
              <span className="text-mainGreen">@</span>
              {comment?.creator?.username}
            </h3>
            {/* Comment text content */}
            <p className="text-[13px] sm:text-sm">{comment?.text}</p>
            {/* Comment buttons */}
            <div className="flex mt-2">
              <p className="text-xs lg:text-sm opacity-70">
                {moment(comment?.createdAt).fromNow()}
              </p>
              <p className="text-xs lg:text-sm ms-4 cursor-pointer">
                {comment?.likedBy?.length} likes
              </p>
              {showReplyForm ? (
                <button className="text-xs lg:text-sm ms-4" onClick={() => setShowReplyForm(false)}>Cancel</button>
              ) : (
                <button className="text-xs lg:text-sm ms-4" onClick={() => setShowReplyForm(true)}>Reply</button>
              )}
              {(comment?.creator?._id == user._id ||
                post?.creator?._id == user._id) && (
                <button className="text-xs lg:text-sm ms-4">Delete</button>
              )}
            </div>
          </div>
          <div className="p-3">
            {comment?.likedBy?.includes(user._id) ? (
              <FaHeart
                className="text-lg cursor-pointer text-mainGreen"
                onClick={() => handleDislikeComment()}
              />
            ) : (
              <CiHeart
                className="text-xl cursor-pointer"
                onClick={() => handleLikeComment()}
              />
            )}
          </div>
        </div>
        {/* Reply form */}
        {showReplyForm && <ReplyForm />}
        {/* Toggle replies */}
        {!showReplies && comment?.replies?.length > 0 && (
          <button className="w-full text-center text-sm opacity-70" onClick={() => setShowReplies(true)}>
            View replies({comment?.replies?.length})
          </button>
        )}
        {showReplies && comment?.replies?.length > 0 && (
          <button className="w-full text-center text-sm opacity-70" onClick={() => setShowReplies(false)}>
            Hide replies
          </button>
        )}
        {/* Replies */}
        {showReplies && 
        <div>
          {comment?.replies?.map(reply => <Reply key={reply}/>)}
        </div>}
      </div>
    </>
  );
}
