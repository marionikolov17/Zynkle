import * as apiService from "../../../shared/services/rest-api.service";
import PATHS from "../../../shared/configs/paths.config";

export const login = async (data) => {
    return apiService.post(PATHS.USERS + "login", data);
}

export const register = async (data) => {
    return apiService.post(PATHS.USERS + "register", data);
}

export const logout = async () => apiService.post(PATHS.USERS + "logout");

export const getTopCreators = async () => apiService.get(PATHS.USERS + "topCreators");

export const getCurrentUser = async () => apiService.get(PATHS.USERS + "current");

export const getUser = async (userId) => apiService.get(PATHS.USERS + userId);

export const followUser = async (userId) => apiService.put(PATHS.USERS + userId + "/follow");

export const unfollowUser = async (userId) => apiService.put(PATHS.USERS + userId + "/unfollow");