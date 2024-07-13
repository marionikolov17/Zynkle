import { CiHeart, CiBookmark } from "react-icons/ci";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Post() {
    return (
        <div className="w-full flex justify-center my-3">
            <div className="w-[50%] shrink border rounded-lg block p-4">
                {/* Author's info */}
                <div className="w-full flex align-middle">
                    <div className="w-10 h-10 flex justify-center align-middle overflow-hidden rounded-full">
                        <img className="object-cover" src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    </div>
                    <p className="my-auto mx-2 font-bold">marionikolov17</p>
                    <p className="my-auto text-sm opacity-60">2 days ago</p>
                </div>
                {/* Description */}
                <div className="mt-4">
                    <p>This is an awesome post. How are you today? <i className="em em-love_letter"></i></p>
                </div>
                {/* Image */}
                <div className="w-full max-h-max mt-4">
                    <img className="object-cover" src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg" alt="" />
                </div>
                {/* Action buttons */}
                <div className="w-full flex justify-around align-middle mt-4">
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
                <div className="mt-2 block">
                    <p className="text-sm font-bold">1 289 likes</p>
                    <Link className="text-sm mt-1 opacity-50">View all 228 comments</Link>
                </div>
            </div>
        </div>
    )
}