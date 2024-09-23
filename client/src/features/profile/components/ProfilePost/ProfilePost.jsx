/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePost({ post }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to={`/post/${post?._id}`} className="row-span-3 flex overflow-hidden relative min-h-28 max-h-32 sm:max-h-64">
      {isLoading && 
      <div className="absolute w-full h-full z-30 loader-background flex justify-center items-center">
        <div className="loader"></div>
      </div>
      }
      <img
        className="object-cover hover:brightness-75 transition w-full"
        src={post?.imageUri}
        onLoad={() => setIsLoading(false)}
        style={{ transform: `scale(${post?.scale})`, translate: `${post?.translateX}px ${post?.translateY}px` }}
      />
    </Link>
  );
}
