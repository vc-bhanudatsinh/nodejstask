import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../config/envConfig";
import catchWraper from "../utils/catchWraper";
import User from "../db/models/userModel";

import * as types from "../types/index";
import * as apiMessage from "../constants/apiMessageConstant";
import apiResponse, { replaceMessage } from "../utils/apiResponse";

const verifyJwtToken = catchWraper(
  async (req: types.request, res: types.response, next: types.nextFunction) => {
    const bearerToken = req.headers?.authorization;
    if (!bearerToken)
      return apiResponse(
        res,
        httpStatus.FORBIDDEN,
        replaceMessage(apiMessage.missingResource, "Token")
      );
    const token = bearerToken.split(" ")[1];

    const data = jwt.verify(token, config.accessSecret);
    data as types.decodeToken;
    if (typeof data === "string")
      return apiResponse(res, httpStatus.FORBIDDEN, data);
    const user = await User.findById(data.id, { email: 1 });
    if (!user)
      return apiResponse(
        res,
        httpStatus.FORBIDDEN,
        replaceMessage(apiMessage.doesNotExistResource, "User")
      );
    req.email = user.email;
    req.id = user.id;
    next();
  }
);

export default verifyJwtToken;
