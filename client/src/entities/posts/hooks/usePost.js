import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postService from "./../services/post.service";

export const useGetPost = (postId) => {
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await postService.getPost(postId);

                setPost(response.data.data);
            } catch (error) {
                if (error.response.status == 404) {
                    return navigate('/404');
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [postId]);

    const onLike = (userId) => {
        setPost(post => {
            post?.likedBy?.push(userId);
            return post;
        })
    }

    const onDislike = (userId) => {
        setPost(post => {
            const newLikedBy = post?.likedBy?.filter(id => id != userId);
            post.likedBy = newLikedBy;
            return post;
        })
    }

    const onSave = (userId) => {
        setPost(post => {
            post?.savedBy?.push(userId);
            return post;
        })
    }

    const onUnsave = (userId) => {
        setPost(post => {
            const newSavedBy = post?.savedBy?.filter(id => id != userId);
            post.savedBy = newSavedBy;
            return post;
        })
    }

    return { post, loading, error, onLike, onDislike, onSave, onUnsave }
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
