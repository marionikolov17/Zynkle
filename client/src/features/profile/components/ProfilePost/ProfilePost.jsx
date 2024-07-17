import { Link } from "react-router-dom";

export default function ProfilePost() {
  return (
    <Link to="/post/1" className="row-span-3 flex">
      <img
        className="object-cover hover:brightness-75 transition"
        src="https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg"
        alt=""
      />
    </Link>
  );
}
