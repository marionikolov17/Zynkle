"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PATH = {
    USERS: {
        REGISTER: "/register",
        LOGIN: "/login",
        LOGOUT: "/logout",
        GET_CURRENT_USER: "/current",
        GET_TOP_CREATORS: "/topCreators",
        GET_USER: "/:userId",
        UPDATE_USER: "/",
        FOLLOW_USER: "/:userId/follow",
        UNFOLLOW_USER: "/:userId/unfollow",
        SEARCH_USERS: "/search"
    },
    POSTS: {
        GET_POSTS: "/",
        CREATE_POST: "/",
        GET_POST: "/:postId",
        DELETE_POST: "/:postId",
        LIKE_POST: "/:postId/like",
        DISLIKE_POST: "/:postId/dislike",
        SAVE_POST: "/:postId/save",
        UNSAVE_POST: "/:postId/unsave"
    },
    COMMENTS: {
        CREATE_COMMENT: "/:postId",
        GET_COMMENTS: "/:postId",
        DELETE_COMMENT: "/:postId/:commentId",
        LIKE_COMMENT: "/:commentId/like",
        DISLIKE_COMMENT: "/:commentId/dislike"
    },
    REPLIES: {
        CREATE_REPLY: "/:postId/:commentId",
        GET_REPLIES: "/:commentId",
        DELETE_REPLY: "/:postId/:replyId",
        LIKE_REPLY: "/:replyId/like",
        DISLIKE_REPLY: "/:replyId/dislike"
    },
    NOTIFICATIONS: {
        GET_NOTIFICATIONS: "/",
        READ_NOTIFICATIONS: "/read",
        CHECK_NOTIFICATIONS: "/check"
    }
};
exports.default = PATH;
