"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplyValidators = void 0;
const express_validator_1 = require("express-validator");
exports.createReplyValidators = (0, express_validator_1.checkSchema)({
    text: {
        in: ["body"],
        exists: {
            errorMessage: "Reply text is required"
        }
    }
});
