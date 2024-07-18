import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
import AddCommentForm from "../../../features/post/components/AddCommentForm/AddCommentForm";
import Comment from "../../../features/post/components/Comment/Comment";
import PostStats from "../../../features/post/components/PostStats/PostStats";

export default function DesktopPost() {
  return (
    <main className="absolute overflow-x-hidden hidden sm:flex justify-center items-center min-h-full max-h-max w-full bg-mainWhite font-montserrat">
      <div className="grow xl:grow-0 xl:w-[75%] 2xl:w-[60%] min-h-full max-h-max">
        <div className="sm:bg-white w-full sm:h-[700px] flex flex-col sm:flex-row">
          {/* Post Image */}
          <div className="flex grow-0 shrink">
            <img
              className="object-cover"
              src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg"
              alt=""
            />
          </div>
          {/* Post details and comments */}
          <div className="grow flex flex-col w-[95%] lg:w-[65%]">
            {/* Owner info */}
            <div className="flex items-center py-3 px-6 border-b">
              <ProfilePicture className="w-10 h-10" />
              <h3 className="text-sm ms-3 font-bold">
                <span className="text-mainGreen">@</span>marionikolov17
              </h3>
            </div>
            {/* Comments and Post Description */}
            <div className="block grow overflow-y-scroll no-scrollbar border-b">

              {/* First comment - post description */}
              <div className="w-full max-h-max flex py-4">
                <div className="ps-6">
                  {" "}
                  {/* Comment Owner Image */}
                  <ProfilePicture className="w-10 h-10" />
                </div>
                <div className="pe-4">
                  <p className="ms-2 text-sm">This is the description of the post!!! some random words just for testing some some</p>
                </div>
              </div>

              <Comment />
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
