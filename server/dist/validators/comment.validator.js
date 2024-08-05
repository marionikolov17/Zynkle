"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentValidators = void 0;
const express_validator_1 = require("express-validator");
exports.createCommentValidators = (0, express_validator_1.checkSchema)({
    text: {
        in: ["body"],
        exists: {
            errorMessage: "Comment text is required"
        }
    }
});
