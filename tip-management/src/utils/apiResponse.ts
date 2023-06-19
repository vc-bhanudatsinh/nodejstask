import * as types from "../types/index";

export const replaceMessage = (message: string, data: string) => {
  return message.replace("##", data);
};

const apiResponse = (
  res: types.response,
  statusCode: number,
  message: string,
  data: [] | object = []
) => {
  return res.status(statusCode).send({ code: statusCode, message, data });
};
export default apiResponse;
