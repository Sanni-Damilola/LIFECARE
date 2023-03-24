/** @format */

export enum HttpCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_IDENTITY,
  INTERNAL_SERVER_ERROR = 500,
}

interface ErrorArgs {
  name?: string;
  message: string;
  isOperational?: boolean;
  httpCode: HttpCode;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly isOperational: boolean = true;
  public readonly httpCode: HttpCode;

  constructor(args: ErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = args.name || "Error";
    this.httpCode = args.httpCode;
    if (typeof args.isOperational !== "undefined") {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}
