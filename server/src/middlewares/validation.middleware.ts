import { Request, Response, NextFunction } from "express";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { IValidationException } from "./../interfaces/exceptions/validation-exception.interface";
import {
  FieldValidationError,
  ResultFactory,
  ValidationChain,
  validationResult,
} from "express-validator";

const appnValidationResult: ResultFactory<IValidationException> =
  validationResult.withDefaults({
    formatter: (error: FieldValidationError) => {
      return { message: error.msg as string, field: error.path as string };
    },
  });

export const inputValidationMiddleware = (validators: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const validation = appnValidationResult(req);

    if (!validation.isEmpty()) {
      const uniqueErrors: { [key: string]: string } = {};

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
        status: RESPONSE_STATUS.FAILED,
        data: uniqueErrorArray,
      });

      return;
    }

    next();
  };
};
