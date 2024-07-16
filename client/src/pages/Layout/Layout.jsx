import { Outlet } from "react-router-dom";
import DesktopNavigation from "../../components/DesktopNavigation/DesktopNavigation";
import MobileNavigation from "../../components/MobileNavigation/MobileNavigation";

export default function Layout() {
    return (
        <main className="w-full min-h-full max-h-max overflow-y-scroll overflow-x-hidden absolute bg-mainWhite flex justify-center font-montserrat no-scrollbar">
            <DesktopNavigation />
            <MobileNavigation />
            <Outlet />
        </main>
    )
}