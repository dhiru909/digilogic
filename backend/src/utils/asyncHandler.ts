import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * A higher-order function that wraps an Express.js request handler
 * and turns it into an async request handler.
 *
 * If the wrapped request handler throws an error, or returns a Promise
 * that rejects with an error, the returned async request handler will
 * call the `next` function with the error.
 */
export const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};