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

    return { comments, commentsLoading, commentsError, onCreateComment }
}