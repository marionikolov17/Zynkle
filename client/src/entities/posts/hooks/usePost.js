import { useEffect, useState } from "react";
import * as postService from "./../services/post.service";

export const useGetPost = (postId) => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await postService.getPost(postId);

                setPost(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [postId]);

    return { post, loading, error }
}