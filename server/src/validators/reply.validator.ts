import { checkSchema, ValidationChain } from "express-validator";

export const createReplyValidators: ValidationChain[] = checkSchema({
    text: {
        in: ["body"],
        exists: {
            errorMessage: "Reply text is required"
        }
    }
});