import { CiSearch } from "react-icons/ci";
import FoundUser from "../../features/search/components/FoundUser/FoundUser";
import { useState } from "react";
import useSearchUser from "../../entities/users/hooks/useSearchUser";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useSearchUser();

  const handleSearchChange = async (event) => {
    const query = event.target.value;

    setIsLoading(true);
    try {
      await search(query, setUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="grow flex justify-center">
        <div className="block p-6 w-full lg:w-[65%] 2xl:w-1/2">
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
                onChange={(e) => handleSearchChange(e)}
              />
              <button
                type="button"
                className="text-white absolute end-2.5 bottom-2.5 bg-mainGreen focus:ring-4 focus:outline-none focus:ring-mainGreen font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search results */}
          <div className="block mt-8 relative">
            {isLoading &&
              <div className="absolute w-full z-30 flex justify-center">
                <div className="loader"></div>
              </div>
            }
            {users.length == 0 && <p>No users found. Start searching</p>}
            {
              users.map(user => <FoundUser key={user._id} user={user}/>)
            }
            {/* <FoundUser /> */}
            {/* <p>No users found.</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
