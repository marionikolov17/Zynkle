import { useState } from "react";
import { useGetNotifications, useReadNotifications } from "../../entities/notifications/hooks/useNotifications";
import Notification from "../../features/notifications/components/Notification/Notification";

export default function Notifications() {
  const [type, setType] = useState(null);

  const { notifications, isLoading, error } = useGetNotifications(type);

  // Read notifications
  useReadNotifications();

  return (
    <>
      <section className="grow flex justify-center overflow-x-hidden">
        <div className="block p-6 w-full lg:w-[65%] 2xl:w-1/2">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {/* Options for notifications */}
          <div className="mt-4 flex w-full items-center overflow-x-scroll no-scrollbar">
            <button 
                className={`bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 ${type == null && 'border-2 border-mainGreen'}`}
                onClick={() => setType(null)}
            >
              All
            </button>
            <button 
                className={`bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 ${type == "follow" && 'border-2 border-mainGreen'}`}
                onClick={() => setType("follow")}
            >
              Followers
            </button>
            <button 
                className={`bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 ${type == "like" && 'border-2 border-mainGreen'}`}
                onClick={() => setType("like")}
            >
              Likes
            </button>
            <button 
                className={`bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 ${type == "comment" && 'border-2 border-mainGreen'}`}
                onClick={() => setType("comment")}
            >
              Comments
            </button>
            <button 
                className={`bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 ${type == "reply" && 'border-2 border-mainGreen'}`}
                onClick={() => setType("reply")}
            >
              Replies
            </button>
          </div>
          {/* Notifications display */}
          <div className="block w-full mt-4 h-max">
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <div className="loader"></div>
              </div>
            )}
            {!isLoading && error && <p className="text-base text-red-500 mx-2">Could not get notifications.</p>}
            {!isLoading && !error && notifications?.map(notification => {
                return <Notification key={notification._id} notification={notification}/>
            })}
            {!isLoading && notifications?.length == 0 && <p className="mx-2">There are no notifications.</p>}
          </div>
        </div>
      </section>
    </>
  );
}
