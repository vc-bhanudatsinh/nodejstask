import mongoose from "mongoose";
import * as types from "../types/index";
import * as apiMessage from "../constants/apiMessageConstant";
import apiResponse, { replaceMessage } from "../utils/apiResponse";

import Place, { TPlace } from "../db/models/placeModel";
import httpStatus from "http-status";

export const createPlace = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { placeName, placeAddress, billAmount, tipAmount }: TPlace = req.body;

  await Place.create({
    placeName,
    placeAddress,
    billAmount,
    tipAmount,
    userId: req.id,
  });
  apiResponse(
    res,
    httpStatus.OK,
    replaceMessage(apiMessage.createResource, "Place")
  );
};

export const getTipsOfUser = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const place = await Place.find(
    { userId: req.id },
    {
      totalAmount: { $sum: ["$billAmount", "$tipAmount"] },
      createdAt: 1,
      placeAddress: 1,
    }
  );
  if (place === null || place.length === 0)
    return apiResponse(
      res,
      httpStatus.NOT_FOUND,
      replaceMessage(apiMessage.doesNotExistResource, "User")
    );
  apiResponse(
    res,
    httpStatus.OK,
    replaceMessage(apiMessage.fetchedResource, "Tip of User"),
    place
  );
};

export const getRepeatedPlacesByUser = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { startDate, endDate } = req.query;
  if (typeof startDate === "string" && typeof endDate === "string") {
    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(endDate),
          },
          userId: new mongoose.Types.ObjectId(req.id),
        },
      },
      {
        $group: {
          _id: "$placeAddress",
          noOfTimesVisited: { $count: {} },
        },
      },
      {
        $sort: {
          noOfTimesVisited: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          placeName: 1,
          userId: 1,
          noOfTimesVisited: 1,
        },
      },
    ];

    const place = await Place.aggregate(pipeline);
    if (place === null || place.length === 0)
      return apiResponse(
        res,
        httpStatus.NOT_FOUND,
        replaceMessage(apiMessage.doesNotExistResource, "User")
      );
    apiResponse(
      res,
      httpStatus.OK,
      replaceMessage(apiMessage.fetchedResource, "Tip of User"),
      place
    );
  }
};

export const getRepeatedTipPercentage = async (
  req: types.request,
  res: types.response,
  next: types.nextFunction
) => {
  const { startDate, endDate } = req.query;
  console.log("startDate", startDate);
  if (typeof startDate === "string" && typeof endDate === "string") {
    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.id),
          createdAt: {
            $gte: new Date(startDate),
          },
        },
      },
      {
        $addFields: {
          tipPercent: {
            $ceil: {
              $divide: [
                {
                  $multiply: ["$tipAmount", 100],
                },
                {
                  $sum: ["$tipAmount", "$billAmount"],
                },
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: "$tipPercent",
          count: { $count: {} },
        },
      },
      {
        $project: {
          tipPercent: "$_id",
          count: 1,
          _id: 0,
          userId: 1,
        },
      },
      {
        $sort: {
          count: -1,
          tipPercent: -1,
        },
      },
      {
        $limit: 1,
      },
    ];

    const place = await Place.aggregate(pipeline);
    if (place === null || place.length === 0)
      return apiResponse(
        res,
        httpStatus.NOT_FOUND,
        replaceMessage(apiMessage.doesNotExistResource, "User")
      );
    apiResponse(res, httpStatus.OK, "tip-percent working", place);
  }
};
