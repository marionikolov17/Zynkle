/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePost({ post }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to={`/post/${post?._id}`} className="row-span-3 flex relative">
      {isLoading && 
      <div className="absolute w-full h-full z-50 loader-background flex justify-center items-center">
        <div className="loader"></div>
      </div>
      }
      <img
        className="object-cover hover:brightness-75 transition"
        src={post?.imageUri}
        onLoad={() => setIsLoading(false)}
      />
    </Link>
  );
}
