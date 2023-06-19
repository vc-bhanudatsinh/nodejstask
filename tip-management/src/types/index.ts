import { request, response, nextFunction } from "./expressTypes";

interface IApiError extends Error {
  statusCode: number;
  stack?: string;
}

interface decodeToken {
  id: string;
}
export { IApiError, decodeToken, nextFunction, request, response };
