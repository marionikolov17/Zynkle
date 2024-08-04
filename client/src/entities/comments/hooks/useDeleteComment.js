import * as commentService from "./../services/comment.service";

export default function useDeleteComment() {
    const deleteComment = async (postId, commentId) => {
        try {
            await commentService.deleteComment(postId, commentId);

            return;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return deleteComment;
}