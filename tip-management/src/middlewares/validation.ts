import joi from "joi";

import * as types from "../types/index";

const validate =
  (schema: joi.ObjectSchema) =>
  async (req: types.request, res: types.response, next: types.nextFunction) => {
    try {
      const options = {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true,
      };
      const { value, error } = schema.validate(req, options);
      if (error)
        return res.status(400).send({
          message: error.message,
          error: "Bad Request",
        });
      next();
    } catch (error: unknown) {
      if (error instanceof Error) next(error);
    }
  };

export default validate;
