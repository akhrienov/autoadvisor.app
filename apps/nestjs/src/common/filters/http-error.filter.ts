import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

import { RESPONSE_ERROR_STATUS, RESPONSE_ERROR_MESSAGE } from '@app/common/common.constants'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const status: number = exception.getStatus()
    const errorResponse: string | object = exception.getResponse()

    let message: string = RESPONSE_ERROR_MESSAGE
    let errors: any = null

    if (typeof errorResponse === 'object' && 'message' in errorResponse) {
      message = (errorResponse as any)['message'] ?? RESPONSE_ERROR_MESSAGE
    }

    if (typeof errorResponse === 'object' && 'error' in errorResponse) {
      errors = (errorResponse as any)['error'] ?? null
    }

    response.status(status).json({
      status: RESPONSE_ERROR_STATUS,
      message,
      errors,
    })
  }
}
