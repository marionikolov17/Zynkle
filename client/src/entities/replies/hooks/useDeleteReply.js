import * as replyService from "./../services/reply.service";

export default function useDeleteReply() {
    const deleteReply = async (postId, replyId) => {
        try {
            await replyService.deleteReply(postId, replyId);

            return;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const onDeleteReply = (setReplies, replyId) => {
        setReplies(replies => {
            const newReplies = replies?.filter(reply => reply?._id != replyId);

            return newReplies;
        })
    }

    return { deleteReply, onDeleteReply }
}