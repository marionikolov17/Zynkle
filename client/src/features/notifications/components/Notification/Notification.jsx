import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";

export default function Notification() {
  return (
    <>
      <div className="w-full mt-3 sm:mt-2 flex items-center overflow-x-hidden sm:hover:bg-white sm:hover:shadow sm:hover:rounded-lg sm:p-2 transition duration-300">
        <div className="shrink-0">
          <ProfilePicture
            className="w-10 h-10"
            imageUrl={
              "https://firebasestorage.googleapis.com/v0/b/zynkle.appspot.com/o/1724878955234-mariooldphoto.jpg?alt=media&token=9aeb66a3-204b-4877-b704-418dd175235f"
            }
          />
        </div>
        <div className="grow ms-4 cursor-pointer">
            <p className="sm:text-base text-sm">
                <span className="text-mainGreen">@</span><span className="font-bold me-1">marionikolov17</span>
                has liked your post. <span className="ms-1 text-sm text-slate-400">3h ago</span>
            </p>
        </div>
        {/* Type of action */}
        {/* Liked post */}
        <div className="w-14 h-12 ms-4 overflow-hidden flex rounded cursor-pointer">
            <img
                className="object-cover" 
                src="https://firebasestorage.googleapis.com/v0/b/zynkle.appspot.com/o/1722860209661-1maxresdefault.jpg?alt=media&token=d5c2f902-fbca-48c5-8c74-902e2e56e846" alt="" />
        </div>
      </div>
    </>
  );
}
