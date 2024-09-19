"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const post_controller_1 = __importDefault(require("./controllers/post.controller"));
const comment_controller_1 = __importDefault(require("./controllers/comment.controller"));
const reply_controller_1 = __importDefault(require("./controllers/reply.controller"));
const notification_controller_1 = __importDefault(require("./controllers/notification.controller"));
const router = express_1.default.Router();
router.use("/users", user_controller_1.default);
router.use("/posts", post_controller_1.default);
router.use("/comments", comment_controller_1.default);
router.use("/replies", reply_controller_1.default);
router.use("/notifications", notification_controller_1.default);
exports.default = router;
