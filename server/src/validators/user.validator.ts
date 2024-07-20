import { checkSchema, ValidationChain } from "express-validator";


export const registerUserValidators: ValidationChain[] = checkSchema({
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