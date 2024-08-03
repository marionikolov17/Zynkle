import PATHS from "../../../shared/configs/paths.config";
import * as apiService from "./../../../shared/services/rest-api.service";

export const getCommentReplies = async (commentId) => apiService.get(PATHS.REPLIES + commentId);