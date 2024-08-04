import PATHS from "../../../shared/configs/paths.config";
import * as apiService from "./../../../shared/services/rest-api.service";

export const createComment = async (postId, data) => apiService.post(PATHS.COMMENTS + postId, data);

export const getPostComments = async (postId) => apiService.get(PATHS.COMMENTS + postId);

export const likeComment = async(commentId) => apiService.put(PATHS.COMMENTS + commentId + "/like");

export const dislikeComment = async(commentId) => apiService.put(PATHS.COMMENTS + commentId + "/dislike");

export const deleteComment = async (postId, commentId) => apiService.del(PATHS.COMMENTS + `${postId}/` + commentId);