import { useGetNotifications } from "../../entities/notifications/hooks/useNotifications";
import Notification from "../../features/notifications/components/Notification/Notification";

export default function Notifications() {
  const { notifications, isLoading, error } = useGetNotifications();

  console.log(notifications);

  return (
    <>
      <section className="grow flex justify-center overflow-x-hidden">
        <div className="block p-6 w-full lg:w-[65%] 2xl:w-1/2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {/* Options for notifications */}
          <div className="mt-4 flex w-full items-center overflow-x-scroll no-scrollbar">
            <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 border-2 border-mainGreen">
              All
            </button>
            <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">
              Followers
            </button>
            <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">
              Likes
            </button>
            <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">
              Comments
            </button>
            <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">
              Replies
            </button>
          </div>
          {/* Notifications display */}
          <div className="block w-full mt-4">
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <div className="loader"></div>
              </div>
            )}
            {error && <p className="text-base text-red-500">Could not get notifications.</p>}
            {!isLoading && !error && notifications?.map(notification => {
                return <Notification key={notification._id} notification={notification}/>
            })}
          </div>
        </div>
      </section>
    </>
  );
}
