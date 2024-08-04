import PATHS from "../../../shared/configs/paths.config";
import * as apiService from "./../../../shared/services/rest-api.service";

export const getCommentReplies = async (commentId) => apiService.get(PATHS.REPLIES + commentId);

export const createReply = async (data, postId, commentId) => apiService.post(PATHS.REPLIES + `${postId}/` + commentId, data);

export const likeReply = async (replyId) => apiService.put(PATHS.REPLIES + replyId + "/like");

export const dislikeReply = async (replyId) => apiService.put(PATHS.REPLIES + replyId + "/dislike");

export const deleteReply = async (postId, replyId) => apiService.del(PATHS.REPLIES + `${postId}/` + replyId);