import * as apiService from "./../../../shared/services/rest-api.service";
import PATHS from "../../../shared/configs/paths.config";

export const createPost = async (data) => apiService.post(PATHS.POSTS, data);

export const getPost = async (postId) => apiService.get(PATHS.POSTS + postId);

export const likePost = async (postId) => apiService.put(PATHS.POSTS + postId + "/like");

export const dislikePost = async (postId) => apiService.put(PATHS.POSTS + postId + "/dislike");

export const savePost = async (postId) => apiService.put(PATHS.POSTS + postId + "/save");

export const unsavePost = async (postId) => apiService.put(PATHS.POSTS + postId + "/unsave");