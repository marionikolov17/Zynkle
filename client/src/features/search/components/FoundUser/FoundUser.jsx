import { Link } from "react-router-dom";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

export default function FoundUser() {
    return (
        <Link to="/profile" className="w-full flex items-center p-2 mb-3 rounded-lg hover:bg-slate-200">
            <ProfilePicture className="w-12 h-12"/>
            <div className="block ms-4">
                <h3 className="text-sm sm:text-lg">
                    <span className="text-mainGreen">@</span>marionikolov17
                </h3>
                <p className="text-sm opacity-70">Mario Nikolov</p>
            </div>
        </Link>
    )
}