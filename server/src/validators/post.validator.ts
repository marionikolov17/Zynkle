import { checkSchema, ValidationChain } from "express-validator";

export const createPostValidators: ValidationChain[] = checkSchema({
    description: {
        in: ["body"],
        exists: {
            errorMessage: "description is required"
        }
    },
});