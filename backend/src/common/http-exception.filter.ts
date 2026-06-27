import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();
  
      const isHttpException = exception instanceof HttpException;
  
      const status = isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody = isHttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };
  
      res.status(status).json({
        statusCode: status,
        path: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
        error: responseBody,
      });
    }
  }