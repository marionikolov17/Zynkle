/* eslint-disable react/prop-types */
import moment from "moment";

import { CiHeart, CiBookmark } from "react-icons/ci";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";
import { useSelector } from "react-redux";

export default function HomePost({ post, innerRef }) {
    const user = useSelector(state => state.user);

    return (
        <div ref={innerRef} className="w-full flex justify-center mt-1 mb-0 sm:mt-3 sm:mb-5">
            <div className="w-[600px] shrink sm:border sm:rounded-lg block py-3 sm:py-4">
                {/* Author's info */}
                <div className="w-full flex align-middle px-4">
                    <ProfilePicture imageUrl={post?.creator?.profilePicture} profileId={post?.creator?._id} className="w-10 h-10"/>
                    <p className="my-auto mx-2 font-bold">{post?.creator?.username}</p>
                    <p className="my-auto text-sm opacity-60">{moment(post?.createdAt).fromNow()}</p>
                </div>
                {/* Description */}
                {post?.description && <div className="mt-2 sm:mt-4 px-4">
                    <p className="text-sm sm:text-base">{post?.description}</p>
                </div>}
                {/* Image */}
                <div className="w-full max-h-max mt-2 sm:mt-4 p-0 sm:px-4">
                    <img 
                        className="object-cover" 
                        src={post?.imageUri}
                        alt="" />
                </div>
                {/* Action buttons */}
                <div className="w-full flex justify-around align-middle mt-2 sm:mt-4 px-4">
                    <div className="flex grow justify-start">
                        <CiHeart className="text-3xl cursor-pointer"/>
                        <AiOutlineComment className="ms-4 text-3xl cursor-pointer"/>
                        <PiShareFat className="ms-4 text-3xl cursor-pointer"/>
                    </div>
                    <div className="flex grow justify-end">
                        <CiBookmark className="text-3xl cursor-pointer"/>
                    </div>
                </div>
                {/* Post Stats */}
                <div className="mt-2 block px-4">
                    <p className="text-sm font-bold">{post?.likedBy?.length} likes</p>
                    <Link to="/post/1" className="text-sm mt-1 opacity-50">View all {post?.comments?.length} comments</Link>
                </div>
            </div>
        </div>
    )
}