import { Link } from "react-router-dom";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

export default function TopCreator() {
  return (
    <div className="px-6 my-5 flex justify-around">
      <div className="flex grow justify-start">
        <ProfilePicture className="w-12 h-12" />
        <div className="block ms-2">
            <Link className="my-auto text-sm font-bold">marionikolov17</Link>
            <p className="my-auto text-sm opacity-60">Mario Nikolov</p>
        </div>
      </div>
      <div className="flex grow justify-end items-center pe-4">
        <button className="bg-mainGreen text-white rounded-lg py-2 px-8 h-max">Follow</button>
      </div>
    </div>
  );
}
