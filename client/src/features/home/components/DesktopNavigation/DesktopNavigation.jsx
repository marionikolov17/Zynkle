import { CiCirclePlus, CiHome, CiSearch, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function DesktopNavigation() {
  return (
    <nav className="block w-64 p-8">
      <h1 className="text-4xl font-bold mb-10">
        Zy<span className="text-mainGreen">n</span>kle
      </h1>

      <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
        <CiHome className="my-auto" />
        <p className="my-auto ms-2">Home</p>
      </Link>
      <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
        <CiCirclePlus className="my-auto" />
        <p className="my-auto ms-2">Create</p>
      </Link>
      <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
        <CiSearch className="my-auto" />
        <p className="my-auto ms-2">Search</p>
      </Link>
      <Link className="flex lg:hidden align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
        <CiUser className="my-auto" />
        <p className="my-auto ms-2">Profile</p>
      </Link>
    </nav>
  );
}
