import joi from "joi";

export const userSignUpSchema = joi.object().keys({
  body: joi.object().keys({
    firstName: joi.string().min(2).max(20).required().messages({
      "string.base": "First Name should be string",
      "string.empty": "First Name should be not empty",
      "string.min": "First Name length should be min 2",
      "string.max": "First Name length should be max 20",
      "any.required": "First Name is required field",
    }),
    lastName: joi.string().min(2).max(20).required().messages({
      "string.base": "Last Name should be string",
      "string.empty": "Last Name should be not empty",
      "string.min": "Last Name length should be min 2",
      "string.max": "Last Name length should be max 20",
      "any.required": "Last Name is required field",
    }),
    password: joi.string().min(8).max(20).required().messages({
      "string.base": "Password should be string",
      "string.min": "Password length should be greater than 8",
      "string.max": "Password length should be less than 20",
      "string.empty": "Password should can not contain empty value",
      "any.required": "Password is a required field",
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
  }),
});

export const loginSchema = joi.object().keys({
  body: joi.object().keys({
    password: joi.string().min(8).max(20).required().messages({
      "string.base": "Password should be string",
      "string.min": "Password length should be greater than 8",
      "string.max": "Password length should be less than 20",
      "string.empty": "Password should can not contain empty value",
      "any.required": "Password is a required field",
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
  }),
});
