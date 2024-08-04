/* eslint-disable no-unused-vars */
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

  const onLikePost = (postId, userId) => {
    setPosts(posts => {
        const newPosts = posts.map(post => {
            if (post?._id == postId) {
                post?.likedBy?.push(userId);
            }

            return post;
        });

        return newPosts;
    })
  }

  const onDislikePost = (postId, userId) => {
    setPosts(posts => {
        const newPosts = posts.map(post => {
            if (post?._id == postId) {
                const newLikedBy = post?.likedBy?.filter(id => id != userId);
                post.likedBy = newLikedBy;
            }

            return post;
        });

        return newPosts;
    })
  }

  const onSavePost = (postId, userId) => {
    setPosts(posts => {
        const newPosts = posts.map(post => {
            if (post?._id == postId) {
                post?.savedBy?.push(userId);
            }

            return post;
        });

        return newPosts;
    })
  }

  const onUnsavePost = (postId, userId) => {
    setPosts(posts => {
        const newPosts = posts.map(post => {
            if (post?._id == postId) {
                const newSavedBy = post?.savedBy?.filter(id => id != userId);
                post.savedBy = newSavedBy;
            }

            return post;
        });

        return newPosts;
    })
  }

  return { posts, loading, error, setError, hasMore, onLikePost, onDislikePost, onSavePost, onUnsavePost };
}
