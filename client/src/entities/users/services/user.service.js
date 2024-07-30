import * as apiService from "../../../shared/services/rest-api.service";
import PATHS from "../../../shared/configs/paths.config";

export const login = async (data) => {
    return apiService.post(PATHS.USERS + "login", data);
}

export const register = async (data) => {
    return apiService.post(PATHS.USERS + "register", data);
}