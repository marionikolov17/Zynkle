import { Outlet } from "react-router-dom";
import DesktopNavigation from "../../features/layout/DesktopNavigation/DesktopNavigation";
import MobileNavigation from "../../features/layout/MobileNavigation/MobileNavigation";

export default function Layout() {
  return (
    <main className="w-full min-h-full max-h-max absolute bg-mainWhite flex justify-center font-montserrat no-scrollbar">
      <DesktopNavigation />
      <MobileNavigation />
      <Outlet />
    </main>
  );
}
