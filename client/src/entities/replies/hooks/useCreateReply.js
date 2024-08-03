import * as replyService from "./../services/reply.service";

export default function useCreateReply() {
    const createReply = async (data, postId, commentId) => {
        try {
            const resopnse = await replyService.createReply(data, postId, commentId);

            return resopnse.data.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const onCreateReply = (setReplies, reply, user) => {
        setReplies(replies => {
            return [...replies, {...reply, creator: { _id: user._id, username: user.username, profilePicture: user.profilePicture }}]
        })
    }

    return { createReply, onCreateReply }
}