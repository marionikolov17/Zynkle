import { useEffect, useState } from "react";
import * as commentService from "./../services/comment.service";

export const useGetPostComments = (postId) => {
    const [comments, setComments] = useState();
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState();

    useEffect(() => {
        setCommentsLoading(true);
        (async () => {
            try {
                const response = await commentService.getPostComments(postId);

                setComments(response.data.data);
            } catch (error) {
                setCommentsError(error);
            } finally {
                setCommentsLoading(false);
            }
        })();
    }, [postId])

    const onCreateComment = (comment) => {
        setComments(comments => {
            return [...comments, comment];
        })
    }

    const onDeleteComment = (commentId) => {
        setComments(comments => {
            const newComments = comments?.filter(comment => comment?._id != commentId);
            return newComments;
        })
    }

    const onLikeComment = (commentId, userId) => {
        setComments(comments => {
            const newComments = comments.map(comment => {
                if (comment?._id == commentId) {
                    comment?.likedBy?.push(userId);
                }

                return comment
            });

            return newComments;
        })
    }

    const onDislikeComment = (commentId, userId) => {
        setComments(comments => {
            const newComments = comments.map(comment => {
                if (comment?._id == commentId) {
                    const newCommentsLikedBy = comment?.likedBy?.filter(id => id != userId);
                    comment.likedBy = newCommentsLikedBy;
                }

                return comment;
            });

            return newComments;
        })
    }

    return { comments, commentsLoading, commentsError, onCreateComment, onLikeComment, onDislikeComment, onDeleteComment }
}

export const useLikeComment = () => {
    const likeComment = async (commentId) => {
        try {
            await commentService.likeComment(commentId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return likeComment;
}

export const useDislikeComment = () => {
    const dislikeComment = async (commentId) => {
        try {
            await commentService.dislikeComment(commentId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return dislikeComment;
}