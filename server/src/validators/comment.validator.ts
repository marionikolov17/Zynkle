import { checkSchema, ValidationChain } from "express-validator";

export const createCommentValidators: ValidationChain[] = checkSchema({
    text: {
        in: ["body"],
        exists: {
            errorMessage: "Comment text is required"
        }
    }
});