import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import Post from "../../features/home/components/Post/Post";
import NoPosts from "../../features/home/components/NoPosts/NoPosts";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import TopCreator from "../../features/home/components/TopCreator/TopCreator";
import DesktopNavigation from "../../components/DesktopNavigation/DesktopNavigation";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";

export default function Home() {
  return (
    <main className="absolute w-full h-full flex justify-center min-h-screen overflow-x-hidden bg-mainWhite font-montserrat">
      {/* Navigation - mobile */}
      <MobileNavigation />
      {/* Navigation section - desktop */}
      <DesktopNavigation />
      {/* Content section */}
      <section className="max-h-full min-h-full flex-auto grow lg:border-e-2 border-slate-200 block overflow-x-hidden overflow-y-scroll no-scrollbar">
        <header className="flex justify-center py-10 border-b-2 sm:border-b-0">
          <button className="flex text-lg sm:text-xl text-mainGreen py-2 px-10 border-mainGreen border-2 rounded-lg">
            <CiCirclePlus className="my-auto" />
            <p className="my-auto ms-2">Create a new post</p>
          </button>
        </header>
        <div className="block">
          {/* Posts wrapper */}
          <Post />
          <Post />
          <NoPosts />
        </div>
      </section>
      <section className="hidden lg:block flex-auto shrink grow-0 w-[25%] sticky top-0">
        <div className="flex p-6 mt-4">
          <ProfilePicture className="w-12 h-12" />
          <div className="block ms-2">
            <Link className="my-auto text-sm font-bold">marionikolov17</Link>
            <p className="my-auto text-sm opacity-60">Mario Nikolov</p>
          </div>
        </div>
        <h3 className="md:hidden lg:block ms-6 font-bold text-lg mb-2">
          Top Creators
        </h3>
        {/* <p className="ms-6 mt-1 text-sm">There are no top creators.</p> */}
        <TopCreator />
        <TopCreator />
      </section>
    </main>
  );
}
