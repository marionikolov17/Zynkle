import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProfilePicture({ className }) {
  return (
    <Link to="/profile" className={className + " " + "flex justify-center align-middle overflow-hidden rounded-full"}>
      <img
        className="object-cover"
        src="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        alt=""
      />
    </Link>
  );
}

