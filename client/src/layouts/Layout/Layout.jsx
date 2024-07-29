import { Outlet } from "react-router-dom";
import DesktopNavigation from "./../DesktopNavigation/DesktopNavigation";
import MobileNavigation from "./../MobileNavigation/MobileNavigation";

export default function Layout() {
  return (
    <main className="w-full min-h-full max-h-max overflow-x-hidden absolute bg-mainWhite flex justify-center font-montserrat no-scrollbar">
      <DesktopNavigation />
      <MobileNavigation />
      <Outlet />
    </main>
  );
}
