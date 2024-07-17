import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <>
      <div className="grow flex justify-center">
        <div className="block p-6 w-[65%] 2xl:w-1/2">
            {/* Search Form */}
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <CiSearch className="text-xl"/>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-mainGreen focus:border-mainGreen"
                placeholder="Search username..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-mainGreen focus:ring-4 focus:outline-none focus:ring-mainGreen font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search results */}
        </div>
      </div>
    </>
  );
}
