import mongoose, { Document } from "mongoose";
import * as validationMessage from "../../constants/validationConstant";
import { replaceMessage } from "../../utils/apiResponse";

export interface TUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IUser extends TUser, Document {
  createdAt: Date;
}

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "First Name"),
    ],
  },
  lastName: {
    type: String,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Last Name"),
    ],
  },
  email: {
    type: String,
    unique: [true, "Duplicate Email"],
    required: [true, replaceMessage(validationMessage.requiredField, "Email")],
  },
  password: {
    type: String,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Password"),
    ],
  },
  createdAt: {
    type: Date,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "createdAt"),
    ],
    default: function () {
      return new Date();
    },
  },
});

const User = mongoose.model<IUser>("User", user);

export default User;
