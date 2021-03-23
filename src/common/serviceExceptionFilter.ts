import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorCodes } from "./exceptions/errors";
import { ServiceException } from "./exceptions/service.exception";

export const isServiceException = (exception: unknown): exception is ServiceException => exception instanceof ServiceException;

@Catch()
export class ServiceExceptionFilter implements ExceptionFilter {

    // tslint:disable-next-line: no-reserved-keywords
    public catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let serviceException = exception;

        if (isServiceException(serviceException)) {
            response
                .status(serviceException.code)
                .json({
                    statusCode: serviceException.code,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: serviceException.message,
                    type: serviceException.type,
                });
        } else {
            const status =
                exception instanceof HttpException
                    ? exception.getStatus()
                    : HttpStatus.INTERNAL_SERVER_ERROR;

            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: serviceException.message,
                    type: ErrorCodes.UNKNOWN_ERROR,
                });
        }



    }
}

