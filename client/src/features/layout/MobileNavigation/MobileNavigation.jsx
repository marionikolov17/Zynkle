import { Link, useLocation } from "react-router-dom";
import { CiHome, CiSearch, CiCirclePlus } from "react-icons/ci";
import ProfilePicture from "./../../../shared/components/ProfilePicture/ProfilePicture";
import { useSelector } from "react-redux";

export default function MobileNavigation() {
  const location = useLocation();

  const user = useSelector(state => state.user);

  return (
    <div className="flex items-center justify-around w-full fixed bottom-0 bg-mainWhite border-t-2 h-10 z-40 sm:hidden">
      <Link to="/">
        <CiHome className={location.pathname == "/" ? "text-2xl my-auto text-mainGreen" : "text-2xl my-auto"} />
      </Link>
      <Link to="/search">
        <CiSearch className={location.pathname == "/search" ? "text-2xl my-auto text-mainGreen" : "text-2xl my-auto"} />
      </Link>
      <Link to="/create">
        <CiCirclePlus className={location.pathname == "/create" ? "text-2xl my-auto text-mainGreen" : "text-2xl my-auto"} />
      </Link>
      <ProfilePicture imageUrl={user?.profilePicture} className={location.pathname == "/profile" ? "w-6 h-6 border border-mainGreen" : "w-6 h-6"} />
    </div>
  );
}
