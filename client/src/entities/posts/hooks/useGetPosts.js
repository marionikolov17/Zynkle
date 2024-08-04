import { useEffect, useState } from "react";
import * as postService from "./../services/post.service";

export default function useGetPosts(pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await postService.getPosts(pageNumber);
        const posts = response.data.data;

        setPosts((prevPosts) => {
          return [...prevPosts, ...posts];
        });

        setHasMore(posts?.length > 0);
      } catch (error) {
        setError(error.response.data.data.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [pageNumber]);

  return { posts, loading, error, setError, hasMore };
}
