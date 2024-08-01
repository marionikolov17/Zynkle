/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../../../shared/components/ProfilePicture/ProfilePicture";

export default function FoundUser({ user }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/profile/${user?._id}`)} className="w-full flex items-center p-2 mb-3 rounded-lg hover:bg-slate-200">
            <ProfilePicture imageUrl={user?.profilePicture} className="w-12 h-12"/>
            <div className="block ms-4">
                <h3 className="text-sm sm:text-lg">
                    <span className="text-mainGreen">@</span>{user?.username}
                </h3>
                <p className="text-sm opacity-70">{user?.firstName + " " + user?.lastName}</p>
            </div>
        </div>
    )
}