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
const authService = __importStar(require("./../services/auth.service"));
const userService = __importStar(require("./../services/user.service"));
const file_upload_config_1 = __importDefault(require("./../config/file-upload.config"));
const path_constants_1 = __importDefault(require("./../constants/path.constants"));
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const validation_middleware_1 = require("./../middlewares/validation.middleware");
const user_validator_1 = require("./../validators/user.validator");
const tryCatch_1 = require("./../utils/tryCatch");
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const params_middleware_1 = require("./../middlewares/params.middleware");
const router = express_1.default.Router();
router.param("userId", params_middleware_1.checkUserId);
router.get(path_constants_1.default.USERS.GET_CURRENT_USER, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getCurrentUser(req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: user
    });
})));
router.post(path_constants_1.default.USERS.REGISTER, (0, validation_middleware_1.inputValidationMiddleware)(user_validator_1.registerUserValidators), (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [accessToken, refreshToken, session] = yield authService.registerUser(req.body);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            session,
            accessToken,
            refreshToken,
        },
    });
})));
router.post(path_constants_1.default.USERS.LOGIN, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [accessToken, refreshToken, session] = yield authService.loginUser(req.body);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            session,
            accessToken,
            refreshToken,
        },
    });
})));
router.post(path_constants_1.default.USERS.LOGOUT, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    authService.logoutUser(req.user.sessionId, req.get("accessToken"));
    res.status(204).end();
})));
router.put(path_constants_1.default.USERS.UPDATE_USER, auth_middleware_1.isAuth, file_upload_config_1.default.single('profilePicture'), validation_middleware_1.fileTypeValidationMiddleware, (0, validation_middleware_1.inputValidationMiddleware)(user_validator_1.updateUserValidators), (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.updateUser(req.body, req.user._id, req.file);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully updated user"
        }
    });
})));
router.get(path_constants_1.default.USERS.GET_TOP_CREATORS, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.getTopCreators();
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            users
        }
    });
})));
router.get(path_constants_1.default.USERS.SEARCH_USERS, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService.searchUsers(req.query.search);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            users
        }
    });
})));
router.get(path_constants_1.default.USERS.GET_USER, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUser(req.params.userId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            user
        }
    });
})));
router.put(path_constants_1.default.USERS.FOLLOW_USER, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.followUser(req.user._id, req.params.userId);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully followed this user",
        },
    });
})));
router.put(path_constants_1.default.USERS.UNFOLLOW_USER, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userService.unfollowUser(req.user._id, req.params.userId);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully unfollowed this user",
        },
    });
})));
exports.default = router;
//# sourceMappingURL=user.controller.js.map