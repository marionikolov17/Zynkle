import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import AddCommentForm from "../../features/post/components/AddCommentForm/AddCommentForm";
import Comment from "../../features/post/components/Comment/Comment";
import PostStats from "../../features/post/components/PostStats/PostStats";

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
            <div className="block grow overflow-y-scroll no-scrollbar border-b">
                <Comment />
            </div>
            {/* Post Stats */}
            <PostStats />
            {/* Add comment form */}
            <AddCommentForm />
          </div>
        </div>
      </div>
    </main>
  );
}
