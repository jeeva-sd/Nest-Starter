import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { logError } from 'src/utils';
import { customResponse, take } from './response.handler';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse: any = exception.getResponse();
    const errorCode = exceptionResponse.code > 100 && exceptionResponse.code < 1000 ? exceptionResponse.code : 400;
    response.code(errorCode).send(exceptionResponse);
  }
}

export class Exception extends HttpException {
  constructor(code: number, message?: string) {
    let response = null;

    if (code) response = take(code);
    else response = customResponse(HttpStatus.BAD_REQUEST, message);

    super(response, HttpStatus.BAD_REQUEST);
  }
}

export class ValidationError extends HttpException {
  constructor(message?: string) {
    const response = customResponse(HttpStatus.BAD_REQUEST, message, null, 'Validation error');

    super(response, HttpStatus.BAD_REQUEST);
  }
}

@Catch()
export class AllExceptionsFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    logError(exception);

    response.code(status).send(customResponse(HttpStatus.INTERNAL_SERVER_ERROR, null, null, exception));
  }
}
