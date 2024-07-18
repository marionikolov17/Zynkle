import { AiOutlineComment } from "react-icons/ai";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { PiShareFat } from "react-icons/pi";

export default function PostStats() {
  return (
    <div className="block grow-0 border-b py-3">
      {/* Action buttons */}
      <div className="w-full flex justify-around align-middle px-4">
        <div className="flex grow justify-start">
          <CiHeart className="text-3xl cursor-pointer" />
          <label htmlFor="commentInput">
            <AiOutlineComment className="ms-4 text-3xl cursor-pointer" />
          </label>
          <PiShareFat className="ms-4 text-3xl cursor-pointer" />
        </div>
        <div className="flex grow justify-end">
          <CiBookmark className="text-3xl cursor-pointer" />
        </div>
      </div>
      {/* Post Analytics */}
      <div className="ms-4 mt-2">
        <p className="text-sm sm:text-base font-bold">1 245 likes</p>
        <p className="text-xs opacity-70">2 days ago</p>
      </div>
    </div>
  );
}
