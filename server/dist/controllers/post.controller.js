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
const postService = __importStar(require("./../services/post.service"));
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const path_constants_1 = __importDefault(require("./../constants/path.constants"));
const file_upload_config_1 = __importDefault(require("./../config/file-upload.config"));
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const validation_middleware_1 = require("./../middlewares/validation.middleware");
const tryCatch_1 = require("./../utils/tryCatch");
const params_middleware_1 = require("./../middlewares/params.middleware");
const router = express_1.default.Router();
router.param("postId", params_middleware_1.checkPostId);
router.get(path_constants_1.default.POSTS.GET_POSTS, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postService.getPosts(+req.query.page || 0);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: posts
    });
})));
router.post(path_constants_1.default.POSTS.CREATE_POST, auth_middleware_1.isAuth, file_upload_config_1.default.single("imageUri"), validation_middleware_1.fileTypeValidationMiddleware, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.createPost(req.body, req.user._id, req.file);
    res.status(201).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully created post",
        },
    });
})));
router.get(path_constants_1.default.POSTS.GET_POST, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postService.getPost(req.params.postId);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: post
    });
})));
router.delete(path_constants_1.default.POSTS.DELETE_POST, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.deletePost(req.params.postId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully deleted post",
        },
    });
})));
router.put(path_constants_1.default.POSTS.LIKE_POST, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.likePost(req.params.postId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully liked post",
        },
    });
})));
router.put(path_constants_1.default.POSTS.DISLIKE_POST, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.dislikePost(req.params.postId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully disliked post",
        },
    });
})));
router.put(path_constants_1.default.POSTS.SAVE_POST, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.savePost(req.params.postId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully saved post",
        },
    });
})));
router.put(path_constants_1.default.POSTS.UNSAVE_POST, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield postService.unsavePost(req.params.postId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully unsaved post",
        },
    });
})));
exports.default = router;
//# sourceMappingURL=post.controller.js.map