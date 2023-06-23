import { Request, Response, NextFunction } from "express";

interface Payload {
  email?: string;
  id?: string;
}
type request = Request & Payload;
type response = Response;
type nextFunction = NextFunction;
export { request, response, nextFunction };
