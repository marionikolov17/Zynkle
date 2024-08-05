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
const commentService = __importStar(require("./../services/comment.service"));
const path_constants_1 = __importDefault(require("./../constants/path.constants"));
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const auth_middleware_1 = require("./../middlewares/auth.middleware");
const tryCatch_1 = require("./../utils/tryCatch");
const validation_middleware_1 = require("./../middlewares/validation.middleware");
const comment_validator_1 = require("./../validators/comment.validator");
const params_middleware_1 = require("./../middlewares/params.middleware");
const router = express_1.default.Router();
router.param("postId", params_middleware_1.checkPostId);
router.param("commentId", params_middleware_1.checkCommentId);
router.get(path_constants_1.default.COMMENTS.GET_COMMENTS, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield commentService.getComments(req.params.postId);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: comments
    });
})));
router.post(path_constants_1.default.COMMENTS.CREATE_COMMENT, auth_middleware_1.isAuth, (0, validation_middleware_1.inputValidationMiddleware)(comment_validator_1.createCommentValidators), (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdComment = yield commentService.createComment(req.body, req.params.postId, req.user._id);
    res.status(201).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: createdComment
    });
})));
router.delete(path_constants_1.default.COMMENTS.DELETE_COMMENT, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield commentService.deleteComment(req.params.postId, req.params.commentId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully deleted comment"
        }
    });
})));
router.put(path_constants_1.default.COMMENTS.LIKE_COMMENT, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield commentService.likeComment(req.params.commentId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully liked comment"
        }
    });
})));
router.put(path_constants_1.default.COMMENTS.DISLIKE_COMMENT, auth_middleware_1.isAuth, (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield commentService.dislikeComment(req.params.commentId, req.user._id);
    res.status(200).json({
        status: response_statuses_constants_1.default.SUCCESS,
        data: {
            message: "Successfully disliked comment"
        }
    });
})));
exports.default = router;
