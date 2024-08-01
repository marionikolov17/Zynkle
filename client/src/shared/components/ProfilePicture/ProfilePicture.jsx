import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProfilePicture({ className, imageUrl, profileId }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to={profileId == undefined ? "/profile" : `/profile/${profileId}`} className={className + " " + "flex justify-center align-middle overflow-hidden rounded-full relative"}>
      {isLoading && 
      <div className="absolute w-full h-full z-50 skeleton-loading flex justify-center items-center"></div>
      }
      <img
        className="object-cover"
        src={imageUrl}
        alt=""
        onLoad={() => setIsLoading(false)}
      />
    </Link>
  );
}
