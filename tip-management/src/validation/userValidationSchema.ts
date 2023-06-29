import joi from "joi";

export const editProfileSchema = joi.object().keys({
  body: joi.object().keys({
    firstName: joi.string().min(2).max(20).messages({
      "string.base": "First Name should be string",
      "string.empty": "First Name should be not empty",
      "string.min": "First Name length should be min 2",
      "string.max": "First Name length should be max 20",
    }),
    lastName: joi.string().min(2).max(20).messages({
      "string.base": "Last Name should be string",
      "string.empty": "Last Name should be not empty",
      "string.min": "Last Name length should be min 2",
      "string.max": "Last Name length should be max 20",
    }),
    email: joi
      .string()
      .required()
      .custom((value, helper) => {
        const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
        if (!regex.test(value))
          return helper.error(`${value} is not a valid Email`);
      })
      .messages({
        "string.base": "Email should be string",
        "any.required": "Email is a required field",
        "string.empty": "Email can not be empty",
      }),
    newEmail: joi
      .string()
      .custom((value, helper) => {
        const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
        if (!regex.test(value))
          return helper.error(`${value} is not a valid new Email`);
      })
      .messages({
        "string.base": "Email should be string",
        "string.empty": "Email can not be empty",
      }),
  }),
});
