import { CiBookmark, CiHeart } from "react-icons/ci";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";

export default function Post() {
  return (
    <main className="absolute overflow-x-hidden flex justify-center items-center min-h-screen max-h-max w-full bg-mainWhite font-montserrat">
      <div className="grow xl:grow-0 xl:w-[75%] 2xl:w-[60%] min-h-full max-h-max">
        <div className="bg-white w-full h-[700px] flex">
          {/* Post Image */}
          <div className="flex grow-0 shrink">
            <img
              className="object-cover"
              src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg"
              alt=""
            />
          </div>
          {/* Post details and comments */}
          <div className="grow flex flex-col w-[65%]">
            {/* Owner info */}
            <div className="flex items-center py-3 px-6 border-b">
              <ProfilePicture className="w-10 h-10" />
              <h3 className="text-sm ms-4 font-bold">
                <span className="text-mainGreen">@</span>marionikolov17
              </h3>
            </div>
            {/* Comments */}
            <div className="block grow overflow-y-scroll no-scrollbar border-b"></div>
            {/* Post Stats */}
            <div className="block grow-0 border-b py-3">
              {/* Action buttons */}
              <div className="w-full flex justify-around align-middle px-4">
                <div className="flex grow justify-start">
                  <CiHeart className="text-3xl cursor-pointer" />
                  <label htmlFor="commentInput"><AiOutlineComment className="ms-4 text-3xl cursor-pointer" /></label>
                  <PiShareFat className="ms-4 text-3xl cursor-pointer" />
                </div>
                <div className="flex grow justify-end">
                  <CiBookmark className="text-3xl cursor-pointer" />
                </div>
              </div>
              {/* Post Analytics */}
              <div className="ms-4 mt-2">
                <p className="text-base font-bold">1 245 likes</p>
                <p className="text-xs opacity-70">2 days ago</p>
              </div>
            </div>
            {/* Add comment form */}
            <form className="w-full flex p-4">
                <input 
                    type="text" 
                    className="grow max-w-full outline-none"
                    name="commentInput"
                    id="commentInput"
                    placeholder="Add comment..."
                    required
                />
                <button className="grow-0 shrink max-w-max text-mainGreen">
                    Comment
                </button>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
