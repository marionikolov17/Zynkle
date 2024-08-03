import PATHS from "../../../shared/configs/paths.config";
import * as apiService from "./../../../shared/services/rest-api.service";

export const getCommentReplies = async (commentId) => apiService.get(PATHS.REPLIES + commentId);

export const likeReply = async (replyId) => apiService.put(PATHS.REPLIES + replyId + "/like");

export const dislikeReply = async (replyId) => apiService.put(PATHS.REPLIES + replyId + "/dislike");