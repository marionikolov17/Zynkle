/* eslint-disable react/prop-types */
import moment from "moment";

import { CiHeart } from "react-icons/ci";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";
// eslint-disable-next-line no-unused-vars
import ReplyForm from "./ReplyForm/ReplyForm";
import Reply from "./Reply/Reply";
import { useSelector } from "react-redux";
import { useContext } from "react";
import PostContext from "../../../../entities/posts/contexts/post.context";

export default function Comment({ comment }) {
    const user = useSelector(state => state.user);

    const { post } = useContext(PostContext);


    return (
        <div className="block">
            {/* Comment */}
            <div className="w-full max-h-max flex py-4">
                <div className="ps-6"> {/* Comment Owner Image */}
                    <ProfilePicture imageUrl={comment?.creator?.profilePicture} className="w-10 h-10"/>
                </div>
                <div className="block grow ms-3">
                    {/* Owner username */}
                    <h3 className="text-sm font-bold">
                        <span className="text-mainGreen">@</span>{comment?.creator?.username}
                    </h3>
                    {/* Comment text content */}
                    <p className="text-[13px] sm:text-sm">
                        {comment?.text}
                    </p>
                    {/* Comment buttons */}
                    <div className="flex mt-2">
                        <p className="text-xs lg:text-sm opacity-70">{moment(comment?.createdAt).fromNow()}</p>
                        <p className="text-xs lg:text-sm ms-4 cursor-pointer">{comment?.likedBy?.length} likes</p>
                        <button className="text-xs lg:text-sm ms-4">Reply</button>
                        {
                            (comment?.creator?._id == user._id || post?.creator?._id == user._id) && 
                            <button className="text-xs lg:text-sm ms-4">Delete</button>
                        }
                    </div>
                </div>
                <div className="p-3">
                    <CiHeart className="text-xl cursor-pointer"/>
                </div>
            </div>
            {/* Reply form */}
            <ReplyForm />
            {/* Toggle replies */}
            {/* <button className="w-full text-center text-sm opacity-70">View replies(4)</button> */}
            <button className="w-full text-center text-sm opacity-70">Hide replies</button>
            {/* Replies */}
            <div className="hidden">
                <Reply />
                <Reply />
            </div>
        </div>
    )
}