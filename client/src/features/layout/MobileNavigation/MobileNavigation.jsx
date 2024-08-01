import { Link } from "react-router-dom";
import { CiHome, CiSearch, CiCirclePlus } from "react-icons/ci";
import ProfilePicture from "./../../../shared/components/ProfilePicture/ProfilePicture";
import { useSelector } from "react-redux";

export default function MobileNavigation() {
  const user = useSelector(state => state.user);

  return (
    <div className="flex items-center justify-around w-full fixed bottom-0 bg-mainWhite border-t-2 h-10 z-40 sm:hidden">
      <Link to="/">
        <CiHome className="text-2xl my-auto text-mainGreen" />
      </Link>
      <Link to="/search">
        <CiSearch className="text-2xl my-auto" />
      </Link>
      <Link to="/create">
        <CiCirclePlus className="text-2xl my-auto" />
      </Link>
      <ProfilePicture imageUrl={user?.profilePicture} className="w-6 h-6" />
    </div>
  );
}
