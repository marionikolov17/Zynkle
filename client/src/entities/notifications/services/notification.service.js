import PATHS from "../../../shared/configs/paths.config";
import * as apiService from "./../../../shared/services/rest-api.service";

export const getNotifications = async (type) => apiService.get(`notifications${type != '' && `?type=${type}`}`);

export const checkNotifications = async () => apiService.get(PATHS.NOTIFICATIONS + "check");

export const readNotifications = async () => apiService.get(PATHS.NOTIFICATIONS + "read");