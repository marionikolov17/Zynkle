import * as apiService from "./../../../shared/services/rest-api.service";
import PATHS from "../../../shared/configs/paths.config";

export const createPost = async (data) => apiService.post(PATHS.POSTS, data);

export const getPost = async (postId) => apiService.get(PATHS.POSTS + postId);