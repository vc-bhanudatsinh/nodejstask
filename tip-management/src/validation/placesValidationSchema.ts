import joi from "joi";

export const creatPlaceSchema = joi.object().keys({
  body: joi.object().keys({
    placeName: joi.string().min(2).max(20).required().messages({
      "string.base": "Place Name should be string",
      "string.empty": "Place Name should be not empty",
      "string.min": "Place Name length should be min 2",
      "string.max": "Place Name length should be max 20",
    }),
    placeAddress: joi.string().min(2).max(20).required().messages({
      "string.base": "Place Name should be string",
      "string.empty": "Place Name should be not empty",
      "string.min": "Place Name length should be min 2",
      "string.max": "Place Name length should be max 20",
    }),
    billAmount: joi.number().required().messages({
      "number.base": "Bill Amount should be number",
      "number.empty": "Bill Amount should be not empty",
      "number.min": "Bill Amount length should be min 2",
      "number.max": "Bill Amount length should be max 20",
    }),
    tipAmount: joi.number().required().messages({
      "number.base": "Tip Amount should be number",
      "number.empty": "Tip Amount should be not empty",
      "number.min": "Tip Amount length should be min 2",
      "number.max": "Tip Amount length should be max 20",
    }),
  }),
});

export const getRepeatedPlaces = joi.object().keys({
  query: joi.object().keys({
    startDate: joi.date().iso().required().messages({
      "date.base": "Start Date should be date",
      "date.empty": "Start Date should be not empty",
      "any.min": "Start Date is required",
    }),
    endDate: joi.date().iso().required().messages({
      "date.base": "End Date should be string",
      "date.empty": "End Date should be not empty",
      "any.required": "End Date is required",
    }),
  }),
});
