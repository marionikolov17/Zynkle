import { Link } from "react-router-dom";
import { CiHome, CiSearch, CiCirclePlus } from "react-icons/ci";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export default function MobileNavigation() {
  return (
    <div className="flex items-center justify-around w-full fixed bottom-0 bg-mainWhite border-t-2 h-10 z-50 sm:hidden">
      <Link to="/">
        <CiHome className="text-2xl my-auto text-mainGreen" />
      </Link>
      <Link to="/search">
        <CiSearch className="text-2xl my-auto" />
      </Link>
      <Link to="/create">
        <CiCirclePlus className="text-2xl my-auto" />
      </Link>
      <ProfilePicture className="w-6 h-6" />
    </div>
  );
}
