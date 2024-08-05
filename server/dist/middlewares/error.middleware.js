"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const multer_1 = __importDefault(require("multer"));
const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    if (error instanceof multer_1.default.MulterError) { // File uploading, file size, etc.
        return res.status(409).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: error.message
            }
        });
    }
    else {
        res.status(500).json({
            status: response_statuses_constants_1.default.ERROR,
            data: {
                message: "Internal server error"
            }
        });
    }
};
exports.errorHandler = errorHandler;
