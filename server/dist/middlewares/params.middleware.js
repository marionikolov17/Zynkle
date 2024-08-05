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
exports.checkUserId = exports.checkReplyId = exports.checkCommentId = exports.checkPostId = void 0;
const postService = __importStar(require("./../services/post.service"));
const commentService = __importStar(require("./../services/comment.service"));
const replyService = __importStar(require("./../services/reply.service"));
const userService = __importStar(require("./../services/user.service"));
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const checkPostId = (req, res, next, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield postService.checkIfPostExsists(value))) {
        return res.status(404).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: "Post not found",
            },
        });
    }
    next();
});
exports.checkPostId = checkPostId;
const checkCommentId = (req, res, next, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield commentService.checkIfCommentExsists(value))) {
        return res.status(404).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: "Comment not found",
            },
        });
    }
    next();
});
exports.checkCommentId = checkCommentId;
const checkReplyId = (req, res, next, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield replyService.checkIfReplyExsists(value))) {
        return res.status(404).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: "Reply not found",
            },
        });
    }
    next();
});
exports.checkReplyId = checkReplyId;
const checkUserId = (req, res, next, value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield userService.checkUserId(value))) {
        return res.status(404).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: "User not found",
            },
        });
    }
    next();
});
exports.checkUserId = checkUserId;
