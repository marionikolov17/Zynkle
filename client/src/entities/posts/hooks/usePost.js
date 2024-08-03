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

export const useLikePost = () => {
    const like = async (postId) => {
        try {
            await postService.likePost(postId);
        } catch (error) {
            throw new Error(error);
        }
    }

    return like;
}

export const useDislikePost = () => {
    const dislike = async (postId) => {
        try {
            await postService.dislikePost(postId);
        } catch (error) {
            throw new Error(error);
        }
    }

    return dislike;
}

export const useSavePost = () => {
    const save = async (postId) => {
        try {
            await postService.savePost(postId);
        } catch (error) {
            throw new Error(error);
        }
    }

    return save;
}

export const useUnsavePost = () => {
    const unsave = async (postId) => {
        try {
            await postService.unsavePost(postId);
        } catch (error) {
            throw new Error(error);
        }
    }

    return unsave;
}
