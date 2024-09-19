"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationService = __importStar(require("./../services/notification.service"));
const tryCatch_1 = require("../utils/tryCatch");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const path_constants_1 = __importDefault(require("../constants/path.constants"));
const router = express_1.default.Router();
router.get(path_constants_1.default.NOTIFICATIONS.GET_NOTIFICATIONS, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notificationService.getNotifications(req.user._id, req.query.type);
    res.status(200).json({
        status: "success",
        data: notifications
    });
})));
router.get(path_constants_1.default.NOTIFICATIONS.CHECK_NOTIFICATIONS, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hasUnreadNotifications = yield notificationService.checkForNotifications(req.user._id);
    res.status(200).json({
        status: "success",
        data: hasUnreadNotifications
    });
})));
router.put(path_constants_1.default.NOTIFICATIONS.READ_NOTIFICATIONS, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield notificationService.readNotifications(req.user._id);
    res.status(200).json({
        status: "success",
        data: {
            message: "Successfully read notifications"
        }
    });
})));
exports.default = router;
