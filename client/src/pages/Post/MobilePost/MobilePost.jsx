/* eslint-disable no-unused-vars */
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import PostStats from "../../../features/post/components/PostStats/PostStats";
import AddCommentForm from "../../../features/post/components/AddCommentForm/AddCommentForm";
import Comment from "../../../features/post/components/Comment/Comment";
import { MdOutlineDelete } from "react-icons/md";
import PostContext from "../../../entities/posts/contexts/post.context";
import useDeletePost from "../../../entities/posts/hooks/useDeletePost";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import ErrorToast from "../../../shared/components/ErrorToast/ErrorToast";
import Loader from "../../../shared/components/Loader/Loader";
import ConfirmWindow from "../../../features/post/components/ConfirmWindow/ConfirmWindow";

export default function MobilePost() {
  const [isPending, setIsPending] = useState(false);
  const [delError, setDelError] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const user = useSelector((state) => state.user);

  const {
    post,
    loading,
    error,
    comments,
    commentsLoading,
    commentsError,
    onCreateComment,
  } = useContext(PostContext);

  const deletePost = useDeletePost();

  const handleDeletePost = async () => {
    setIsPending(true);
    try {
      await deletePost(post?._id);
    } catch (error) {
      setShowConfirm(false);
      setDelError("Error: Could not delete post");
    } finally {
      setIsPending(false);
    }
  };

  const onCancelDelete = () => setShowConfirm(false);

  return (
    <>
      {error && <ErrorToast error={error} />}
      {delError && <ErrorToast error={delError} setError={setDelError} />}
      {loading || (isPending && <Loader />)}
      {showConfirm && (
        <ConfirmWindow handler={handleDeletePost} cancel={onCancelDelete} />
      )}
      <main className="sm:hidden z-10 w-full flex flex-col absolute min-h-full max-h-max bg-mainWhite font-montserrat">
        <div className="w-full relative flex justify-center">
          <Link to={`/profile/${post?.creator?._id}`} className="absolute left-0 my-4 ms-4">
            <IoMdArrowRoundBack className="text-xl" />
          </Link>
          <h3 className="font-bold py-4">
            <span className="text-mainGreen">@</span>{post?.creator?.username}
          </h3>
          {post?.creator?._id == user._id && 
            <button className="absolute right-0 me-4 h-full flex items-center" onClick={() => setShowConfirm(true)}>
              <MdOutlineDelete className="text-red-500 text-2xl" />
            </button>
          }
        </div>
        {/* Post Image */}
        <div className={!imageLoading ? "w-full max-h-max" : "w-full h-[300px] skeleton-loading"}>
          <img
            className="object-cover"
            src={post?.imageUri}
            onLoad={() => setImageLoading(false)}
            alt=""
          />
        </div>
        <PostStats />
        <AddCommentForm postId={post?._id} onCreateComment={onCreateComment} />
        {/* Comments */}
        <div className="block overflow-y-scroll no-scollbar overflow-x-hidden">
          {commentsLoading && (
            <div className="w-full flex justify-center items-center min-h-full loader-background">
              <div className="loader"></div>
            </div>
          )}
          {commentsError && (
            <p className="text-center text-sm text-red-500">
              Error. Could not load comments.
            </p>
          )}
          {comments?.length == 0 && (
            <p className="text-center text-sm">
              There are no comments, yet. Comment one
            </p>
          )}
          {comments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </main>
    </>
  );
}
