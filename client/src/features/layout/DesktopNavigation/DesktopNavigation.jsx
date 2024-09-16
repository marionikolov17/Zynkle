import { CiBellOn, CiCirclePlus, CiHome, CiSearch, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function DesktopNavigation() {
  return (
    <section className="hidden sm:flex flex-auto grow-0 xl:grow border-e-2 xl:border-none border-slate-200 justify-end sticky top-0 h-screen bg-white xl:bg-transparent">
      <nav className="hidden xl:block w-64 p-8 mt-10 border h-max rounded-lg shadow-sm bg-white">
        <h1 className="text-4xl font-bold mb-10">
          Zy<span className="text-mainGreen">n</span>kle
        </h1>

        <Link to="/" className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
          <CiHome className="my-auto" />
          <p className="my-auto ms-2">Home</p>
        </Link>
        <Link to="/create" className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
          <CiCirclePlus className="my-auto" />
          <p className="my-auto ms-2">Create</p>
        </Link>
        <Link to="/search" className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
          <CiSearch className="my-auto" />
          <p className="my-auto ms-2">Search</p>
        </Link>
        <Link to="/notifications" className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
          <CiBellOn className="my-auto" />
          <p className="my-auto ms-2">Notifications</p>
        </Link>
        <Link className="flex lg:hidden align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
          <CiUser className="my-auto" />
          <p className="my-auto ms-2">Profile</p>
        </Link>
      </nav>
      <nav className="block xl:hidden">
        <h1 className="text-2xl text-center font-bold my-4">Z</h1>
        <Link to="/" className="flex align-middle text-3xl mb-4 p-4 cursor-pointer hover:text-mainGreen">
          <CiHome className="my-auto" />
        </Link>
        <Link to="/create" className="flex align-middle text-3xl mb-4 p-4 cursor-pointer hover:text-mainGreen">
          <CiCirclePlus className="my-auto" />
        </Link>
        <Link to="/search" className="flex align-middle text-3xl mb-4 p-4 cursor-pointer hover:text-mainGreen">
          <CiSearch className="my-auto" />
        </Link>
        <Link to="/notifications" className="flex align-middle text-3xl mb-4 p-4 cursor-pointer hover:text-mainGreen">
          <CiBellOn className="my-auto" />
        </Link>
        <Link to="/profile" className="flex align-middle text-3xl mb-4 p-4 cursor-pointer hover:text-mainGreen">
          <CiUser className="my-auto" />
        </Link>
      </nav>
    </section>
  );
}
