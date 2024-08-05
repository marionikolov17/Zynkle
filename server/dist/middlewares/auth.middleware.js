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
exports.isAuth = exports.checkRefreshToken = exports.checkAccessToken = void 0;
const jwt = __importStar(require("./../lib/jwt.lib"));
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const user_session_1 = require("./../services/user.session");
const invalid_tokens_1 = require("../services/invalid-tokens");
const verifyToken = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jwt.verify(token, secret);
});
const generateToken = (session) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jwt.sign({ _id: session._id, sessionId: session.sessionId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
});
const checkAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.get("accessToken");
    if (!accessToken) {
        return next();
    }
    if (invalid_tokens_1.invalidAccessTokens.includes(accessToken))
        return next();
    try {
        req.user = yield verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            req.expiredAccessToken = true;
        }
        else {
            console.log(err);
        }
        next();
    }
});
exports.checkAccessToken = checkAccessToken;
const checkRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.expiredAccessToken)
        return next();
    const refreshToken = req.get("refreshToken");
    if (!refreshToken) {
        return next();
    }
    try {
        const refreshPayload = yield verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // @ts-ignore
        const session = (0, user_session_1.getSession)(refreshPayload.sessionId);
        if (!session) {
            return next();
        }
        const newAccessToken = yield generateToken(session);
        res.setHeader("accessToken", newAccessToken);
        // @ts-ignore
        req.user = yield verifyToken(newAccessToken, ACCESS_TOKEN_SECRET_KEY);
        next();
    }
    catch (err) {
        console.error(err.message, "- REFRESH TOKEN");
        next();
    }
});
exports.checkRefreshToken = checkRefreshToken;
const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                error: "You must login",
            },
        });
    }
    next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=auth.middleware.js.map