import * as replyService from "./../services/reply.service";

export default function useDislikeReply() {
    const dislikeReply = async (replyId) => {
        try {
            await replyService.dislikeReply(replyId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const onDisikeReply = (setReplies, replyId, userId) => {
        setReplies(replies => {
            const newReplies = replies.map(reply => {
                if (reply?._id == replyId) {
                    const newRepliesLikedBy = reply?.likedBy?.filter(id => id != userId);
                    reply.likedBy = newRepliesLikedBy;
                }

                return reply;
            });

            return newReplies;
        })
    }

    return { dislikeReply, onDisikeReply }
}