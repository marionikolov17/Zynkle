"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidators = exports.registerUserValidators = void 0;
const express_validator_1 = require("express-validator");
exports.registerUserValidators = (0, express_validator_1.checkSchema)({
    username: {
        in: ["body"],
        exists: {
            errorMessage: "username is required"
        }
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "email is required"
        },
        isEmail: {
            errorMessage: "email must be valid"
        }
    },
    firstName: {
        in: ["body"],
        exists: {
            errorMessage: "first name is required"
        }
    },
    lastName: {
        in: ["body"],
        exists: {
            errorMessage: "last name is required"
        }
    },
    password: {
        in: ["body"],
        exists: {
            errorMessage: "password is required"
        }
    },
    rePassword: {
        in: ["body"],
        exists: {
            errorMessage: "confirm password is required"
        }
    },
});
exports.updateUserValidators = (0, express_validator_1.checkSchema)({
    username: {
        in: ["body"],
        exists: {
            errorMessage: "username is required"
        }
    },
    firstName: {
        in: ["body"],
        exists: {
            errorMessage: "firstName is required"
        }
    },
    lastName: {
        in: ["body"],
        exists: {
            errorMessage: "lastName is required"
        }
    },
    email: {
        in: ["body"],
        exists: {
            errorMessage: "email is required"
        },
        isEmail: {
            errorMessage: "Invalid email"
        }
    },
});