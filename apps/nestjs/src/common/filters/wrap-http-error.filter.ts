import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

import { MESSAGES, STATUSES } from '@app/common/constants'

@Catch(HttpException)
export class WrapHttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const status: number = exception.getStatus()
    const errorResponse: string | object = exception.getResponse()

    let message: string = MESSAGES.RESPONSE_ERROR
    let errors: any = null

    if (typeof errorResponse === 'object' && 'message' in errorResponse) {
      message = (errorResponse as any)['message'] ?? MESSAGES.RESPONSE_ERROR
    }

    if (typeof errorResponse === 'object' && 'error' in errorResponse) {
      errors = (errorResponse as any)['error'] ?? null
    }

    response.status(status).json({
      status: STATUSES.RESPONSE_ERROR,
      message,
      errors,
    })
  }
}
