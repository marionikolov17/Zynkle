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
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import useGetReplies from "../../../../entities/replies/hooks/useGetReplies";
import ConfirmBlock from "../ConfirmBlock/ConfirmBlock";
import useDeleteComment from "../../../../entities/comments/hooks/useDeleteComment";

export default function Comment({ comment }) {
  const [replies, setReplies] = useState([]);
  const [totalReplies, setTotalReplies] = useState(comment?.replies?.length);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user);

  const { post, onLikeComment, onDislikeComment, onDeleteComment } = useContext(PostContext);

  const likeComment = useLikeComment();
  const dislikeComment = useDislikeComment();
  const deleteComment = useDeleteComment();

  const getReplies = useGetReplies();

  const handleLikeComment = async () => {
    if (replies?.length > 0) return; // Already fetched replies

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

  const handleDeleteComment = async () => {
    setIsLoading(true);
    try {
      await deleteComment(post?._id, comment?._id);

      onDeleteComment(comment?._id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const onCancelDelete = () => {
    setShowConfirm(false);
  }

  const fetchReplies = async () => {
    setIsRepliesLoading(true);
    try {
      const results = await getReplies(comment?._id);

      setReplies(results);
      setShowReplies(true);
    } catch (error) {
      console.log("replies", error);
    } finally {
      setIsRepliesLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      )}
      {error && <ErrorToast text={error} />}
      {showConfirm && <ConfirmBlock handler={handleDeleteComment} cancel={onCancelDelete} />}
      <div className={!showConfirm ? "block" : "hidden"}>
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
                <button
                  className="text-xs lg:text-sm ms-4"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="text-xs lg:text-sm ms-4"
                  onClick={() => setShowReplyForm(true)}
                >
                  Reply
                </button>
              )}
              {(comment?.creator?._id == user._id ||
                post?.creator?._id == user._id) && (
                <button className="text-xs lg:text-sm ms-4" onClick={() => setShowConfirm(true)}>Delete</button>
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
        {showReplyForm && (
          <ReplyForm
            setReplies={setReplies}
            setShowReplyForm={setShowReplyForm}
            commentId={comment?._id}
            setTotalReplies={setTotalReplies}
          />
        )}
        {/* Toggle replies */}
        {!showReplies && totalReplies > 0 && (
          <button
            className="w-full text-center text-sm opacity-70"
            onClick={() => fetchReplies()}
          >
            View replies({totalReplies})
          </button>
        )}
        {showReplies && totalReplies > 0 && (
          <button
            className="w-full text-center text-sm opacity-70"
            onClick={() => setShowReplies(false)}
          >
            Hide replies
          </button>
        )}
        {/* Replies */}
        {isRepliesLoading && (
          <div className="w-full flex justify-center items-center">
            <div className="loader"></div>
          </div>
        )}
        {showReplies && (
          <div>
            {replies?.map((reply) => (
              <Reply
                reply={reply}
                setReplies={setReplies}
                key={reply?._id}
                setTotalReplies={setTotalReplies}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
