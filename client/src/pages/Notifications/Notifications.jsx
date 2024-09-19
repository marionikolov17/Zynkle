import Notification from "../../features/notifications/components/Notification/Notification";

export default function Notifications() {
    return (
        <>
            <section className="grow flex justify-center overflow-x-hidden">
                <div className="block p-6 w-full lg:w-[65%] 2xl:w-1/2">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    {/* Options for notifications */}
                    <div className="mt-4 flex w-full items-center overflow-x-scroll no-scrollbar">
                        <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2 border-2 border-mainGreen">All</button>
                        <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">Followers</button>
                        <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">Likes</button>
                        <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">Comments</button>
                        <button className="bg-white py-1 px-8 rounded-lg shadow hover:bg-gray-100 hover:text-mainGreen me-2">Replies</button>
                    </div>
                    {/* Notifications display */}
                    <div className="block w-full mt-4">
                        <Notification />
                        <Notification />
                    </div>
                </div>
            </section>
        </>
    )
}