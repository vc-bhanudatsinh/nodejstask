import mongoose, { Document } from "mongoose";
import * as validationMessage from "../../constants/validationConstant";
import { replaceMessage } from "../../utils/apiResponse";
import { requiredField } from "../../constants/apiMessageConstant";

export interface TPlace {
  userId: string;
  placeName: string;
  placeAddress: string;
  billAmount: string;
  tipAmount: string;
}

interface IPlace extends TPlace, Document {
  createdAt: Date;
}

const place = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "First Name"),
    ],
  },
  placeName: {
    type: String,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Last Name"),
    ],
  },
  placeAddress: {
    type: String,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Password"),
    ],
  },
  billAmount: {
    type: Number,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Bill Amount"),
    ],
  },
  tipAmount: {
    type: Number,
    required: [
      true,
      replaceMessage(validationMessage.requiredField, "Tip Amount"),
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

const Place = mongoose.model<IPlace>("Place", place);

export default Place;
