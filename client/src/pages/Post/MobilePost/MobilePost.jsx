import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import PostStats from "../../../features/post/components/PostStats/PostStats";
import AddCommentForm from "../../../features/post/components/AddCommentForm/AddCommentForm";
import Comment from "../../../features/post/components/Comment/Comment";

export default function MobilePost() {
  return (
    <main className="sm:hidden w-full flex flex-col absolute min-h-full max-h-max bg-mainWhite font-montserrat">
      <div className="w-full relative flex justify-center">
        <Link to="/" className="absolute left-0 my-4 ms-4">
            <IoMdArrowRoundBack className="text-xl"/>
        </Link>
        <h3 className="font-bold py-4">
            <span className="text-mainGreen">@</span>marionikolov17
        </h3>
      </div>
      {/* Post Image */}
      <div className="w-full max-h-max">
        <img
          className="object-cover"
          src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg"
          alt=""
        />
      </div>
      <PostStats />
      <AddCommentForm />
      {/* Comments */}
      <div className="block overflow-y-scroll no-scollbar overflow-x-hidden">
        <Comment />
      </div>
    </main>
  );
}
