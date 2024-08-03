import * as replyService from "./../services/reply.service";

export default function useGetReplies() {
    const getReplies = async (commentId) => {
        try {
            const response = await replyService.getCommentReplies(commentId);

            return response.data.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return getReplies;
}