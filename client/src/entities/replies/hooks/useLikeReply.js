import * as replyService from "./../services/reply.service";

export default function useLikeReply() {
    const likeReply = async (replyId) => {
        try {
            await replyService.likeReply(replyId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const onLikeReply = (setReplies, replyId, userId) => {
        setReplies(replies => {
            const newReplies = replies.map(reply => {
                if (reply?._id == replyId) {
                    reply?.likedBy?.push(userId);
                }

                return reply
            });

            return newReplies;
        })
    }

    return { likeReply, onLikeReply }
}