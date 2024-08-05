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
exports.fileTypeValidationMiddleware = exports.inputValidationMiddleware = void 0;
const response_statuses_constants_1 = __importDefault(require("./../constants/response-statuses.constants"));
const express_validator_1 = require("express-validator");
const appnValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: (error) => {
        return { message: error.msg, field: error.path };
    },
});
const inputValidationMiddleware = (validators) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(validators.map((validator) => validator.run(req)));
        const validation = appnValidationResult(req);
        if (!validation.isEmpty()) {
            const uniqueErrors = {};
            validation.array().forEach((error) => {
                if (!(error.field in uniqueErrors)) {
                    uniqueErrors[error.field] = error.message;
                }
            });
            const uniqueErrorArray = Object.keys(uniqueErrors).map((field) => ({
                message: uniqueErrors[field],
                field: field,
            }));
            res.status(422).json({
                status: response_statuses_constants_1.default.FAILED,
                data: uniqueErrorArray,
            });
            return;
        }
        next();
    });
};
exports.inputValidationMiddleware = inputValidationMiddleware;
const fileTypeValidationMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error) {
        return res.status(409).json({
            status: response_statuses_constants_1.default.FAILED,
            data: {
                message: error.message,
            },
        });
    }
    next();
});
exports.fileTypeValidationMiddleware = fileTypeValidationMiddleware;
//# sourceMappingURL=validation.middleware.js.map