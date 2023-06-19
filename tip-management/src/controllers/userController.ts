import * as types from "../types/index";
import * as apiMessage from "../constants/apiMessageConstant";
import apiResponse, { replaceMessage } from "../utils/apiResponse";

import User from "../db/models/userModel";
import httpStatus from "http-status";

export const getProfile = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const id = req.id;
  const userProfile = await User.findById(id, {
    firstName: 1,
    lastName: 1,
    email: 1,
  }).lean();
  if (!userProfile)
    return apiResponse(
      res,
      httpStatus.FORBIDDEN,
      replaceMessage(apiMessage.doesNotExistResource, "User")
    );
  delete userProfile["_id"];
  apiResponse(
    res,
    httpStatus.OK,
    replaceMessage(apiMessage.fetchedResource, "Profile"),
    { userProfile }
  );
};

export const editProfile = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  interface IEditProfile {
    [index: string]: string | undefined;
    firstName?: string;
    lastName?: string;
    email?: string;
  }

  const keys: string[] = Object.keys(req.body);
  if (keys.length === 1 && keys.includes("email"))
    return apiResponse(
      res,
      400,
      replaceMessage(apiMessage.doesNotExistResource, "Updated fields")
    );
  const userProfile: IEditProfile = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== "email") {
      if (key === "newEmail") userProfile["email"] = req.body[key];
      userProfile[key] = req.body[keys[i]];
    }
  }
  const isUpdated = await User.updateOne(
    { email: req.body.email },
    userProfile
  );
  if (isUpdated.matchedCount === 0)
    return apiResponse(
      res,
      httpStatus.NOT_FOUND,
      replaceMessage(apiMessage.incorrectResource, "Email")
    );
  else if (isUpdated.modifiedCount === 0)
    return apiResponse(
      res,
      httpStatus.NOT_MODIFIED,
      replaceMessage(apiMessage.noUpdateResource, "Profile")
    );
  return apiResponse(
    res,
    httpStatus.OK,
    replaceMessage(apiMessage.successUpdateResource, "Profile")
  );
};
