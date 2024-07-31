import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProfilePicture({ className, imageUrl }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link to="/profile" className={className + " " + "flex justify-center align-middle overflow-hidden rounded-full relative"}>
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

/* 
https://firebasestorage.googleapis.com/v0/b/zynkle.appspot.com/o/11640168385jtmh7kpmvna5ddyynoxsjy5leb1nmpvqooaavkrjmt9zs7vtvuqi4lcwofkzsaejalxn7ggpim4hkg0wbwtzsrp1ldijzbdbsj5z.png?alt=media&token=aac82a1b-f429-4811-a35e-b8f261ad03ad
*/

/* 
https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
*/