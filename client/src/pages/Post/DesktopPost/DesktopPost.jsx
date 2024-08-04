/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";

import AddCommentForm from "../../../features/post/components/AddCommentForm/AddCommentForm";
import Comment from "../../../features/post/components/Comment/Comment";
import PostStats from "../../../features/post/components/PostStats/PostStats";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import ProfilePicture from "../../../shared/components/ProfilePicture/ProfilePicture";
import ConfirmWindow from "../../../features/post/components/ConfirmWindow/ConfirmWindow";
import PostContext from "../../../entities/posts/contexts/post.context";
import Loader from "../../../shared/components/Loader/Loader";
import { useSelector } from "react-redux";
import ErrorToast from "../../../shared/components/ErrorToast/ErrorToast";
import useDeletePost from "../../../entities/posts/hooks/useDeletePost";

export default function DesktopPost() {
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
      setDelError(error.message);
      setShowConfirm(false);
    } finally {
      setIsPending(false);
    }
  }

  const onCancelDelete = () => setShowConfirm(false);

  return (
    <>
      {error && <ErrorToast error={error}/>}
      {delError && <ErrorToast error={delError} setError={setDelError}/>}
      {loading || isPending && <Loader />}
      {showConfirm && <ConfirmWindow handler={handleDeletePost} cancel={onCancelDelete} />}
      <main className="absolute z-10 overflow-x-hidden hidden sm:flex justify-center items-center min-h-full max-h-max w-full bg-mainWhite font-montserrat">
        <div className="grow xl:grow-0 xl:w-[75%] 2xl:w-[60%] min-h-full max-h-max">
          <div className="sm:bg-white w-full sm:h-[700px] flex flex-col sm:flex-row">
            {/* Post Image */}
            <div
              className={
                !imageLoading
                  ? "flex grow-0 shrink"
                  : "grow-1 shrink-0 w-1/2 h-full skeleton-loading"
              }
            >
              <img
                className="object-cover"
                src={post?.imageUri}
                onLoad={() => setImageLoading(false)}
                alt=""
              />
            </div>
            {/* Post details and comments */}
            <div className="grow flex flex-col w-[95%] lg:w-[65%]">
              {/* Owner info */}
              <div className="flex items-center py-3 px-6 border-b relative">
                <ProfilePicture
                  imageUrl={post?.creator?.profilePicture}
                  className="w-10 h-10"
                />
                <h3 className="text-sm ms-3 font-bold">
                  <span className="text-mainGreen">@</span>
                  {post?.creator?.username}
                </h3>
                {post?.creator?._id == user._id && (
                  <button onClick={() => setShowConfirm(true)}>
                    <MdOutlineDelete className="text-red-500 text-2xl ms-4" />
                  </button>
                )}
                <Link
                  to={`/profile/${post?.creator?._id}`}
                  className="absolute end-0 me-4 my-auto"
                >
                  <IoMdClose className="text-xl" />
                </Link>
              </div>
              {/* Comments and Post Description */}
              <div className="block grow overflow-y-scroll no-scrollbar border-b">
                {/* First comment - post description */}
                {post?.description && (
                  <div className="w-full max-h-max flex py-4">
                    <div className="ps-6">
                      {" "}
                      {/* Comment Owner Image */}
                      <ProfilePicture
                        imageUrl={post?.creator?.profilePicture}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="pe-4">
                      <p className="ms-2 text-sm">{post?.description}</p>
                    </div>
                  </div>
                )}

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
                {/* <Comment />
                <Comment /> */}
              </div>
              {/* Post Stats */}
              <PostStats />
              {/* Add comment form */}
              <AddCommentForm
                postId={post?._id}
                onCreateComment={onCreateComment}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
