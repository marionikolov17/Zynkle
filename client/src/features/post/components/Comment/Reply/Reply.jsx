import { CiHeart } from "react-icons/ci";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";

export default function Reply() {
  return (
    <div className="flex w-full ps-12 my-4">
      <div className="ps-6">
        {" "}
        {/* Comment Owner Image */}
        <ProfilePicture className="w-10 h-10" />
      </div>
      <div className="block grow ms-3">
        {/* Owner username */}
        <h3 className="text-sm font-bold">
          <span className="text-mainGreen">@</span>ivantodorov
        </h3>
        {/* Comment text content */}
        <p className="text-sm">
          This is an awesome coment and I want to read it out loud!!
        </p>
        {/* Comment buttons */}
        <div className="flex mt-2">
          <p className="text-xs lg:text-sm opacity-70">2 days</p>
          <p className="text-xs lg:text-sm ms-4 cursor-pointer">3 likes</p>
          <button className="text-xs lg:text-sm ms-4">Reply</button>
        </div>
      </div>
      <div className="p-3">
        <CiHeart className="text-xl cursor-pointer" />
      </div>
    </div>
  );
}