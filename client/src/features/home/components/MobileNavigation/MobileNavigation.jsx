import { Link } from "react-router-dom";
import { CiHome, CiSearch, CiCirclePlus } from "react-icons/ci";
import ProfilePicture from "./../../../../components/ProfilePicture/ProfilePicture"

export default function MobileNavigation() {
    return (
        <div className="flex items-center justify-around w-full fixed bottom-0 bg-mainWhite border-t-2 h-10 z-50 sm:hidden">
            <Link>
                <CiHome className="text-2xl my-auto"/>
            </Link>
            <Link>
                <CiSearch className="text-2xl my-auto"/>
            </Link>
            <Link>
                <CiCirclePlus className="text-2xl my-auto"/>
            </Link>
            <Link>
                <ProfilePicture className="w-6 h-6"/>
            </Link>
        </div>
    )
}