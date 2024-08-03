import * as commentService from "./../services/comment.service";

export default function useCreateComment() {
    const createComment = async (postId, data) => {
        try {
            const response = await commentService.createComment(postId, data);
        } catch (error) {
            throw new Error(error.response.data.data.message);
        }
    }

    return createComment;
}