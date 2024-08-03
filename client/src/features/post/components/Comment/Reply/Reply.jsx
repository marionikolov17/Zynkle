/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import ProfilePicture from "../../../../../shared/components/ProfilePicture/ProfilePicture";
import moment from "moment";
import { useContext, useState } from "react";
import PostContext from "../../../../../entities/posts/contexts/post.context";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import useLikeReply from "../../../../../entities/replies/hooks/useLikeReply";
import Loader from "../../../../../shared/components/Loader/Loader";

export default function Reply({ reply, setReplies }) {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const { post } = useContext(PostContext);

  const { likeReply, onLikeReply } = useLikeReply();

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

  const handleDislikeReply = async () => {};

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex w-full ps-6 sm:ps-12 my-4">
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
              <button className="text-xs lg:text-sm ms-4">Delete</button>
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
