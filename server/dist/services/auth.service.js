"use strict";
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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const auth_helper_1 = require("./../helpers/auth.helper");
const User_1 = __importDefault(require("./../models/User"));
const invalid_tokens_1 = require("./invalid-tokens");
const user_session_1 = require("./user.session");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (user) {
        throw new Error("User already exsists");
    }
    const createdUser = yield User_1.default.create(data);
    return (0, auth_helper_1.createTokensAndSession)(createdUser._id);
});
exports.registerUser = registerUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email: data === null || data === void 0 ? void 0 : data.email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    if (!(yield (0, auth_helper_1.verifyPassword)(data === null || data === void 0 ? void 0 : data.password, user.password))) {
        throw new Error("Invalid email or password");
    }
    return (0, auth_helper_1.createTokensAndSession)(user._id);
});
exports.loginUser = loginUser;
const logoutUser = (sessionId, token) => {
    (0, user_session_1.invalidateSession)(sessionId);
    (0, invalid_tokens_1.invalidateAccessToken)(token);
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=auth.service.js.map