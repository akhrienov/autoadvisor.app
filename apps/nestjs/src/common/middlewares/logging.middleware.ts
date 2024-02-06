import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly REQUEST_CTX: string = 'Request'
  private readonly RESPONSE_CTX: string = 'Response'

  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: () => void): void {
    const { method, originalUrl, ip } = req
    const userAgent: string = this.getUserAgent(req)
    const headers: string = this.getHeaders(req)
    const queryParams: string = this.getQueryParams(req)
    const requestBody: string = this.getBodyData(req)

    const oldSend = res.send
    let responseData: string | object = String()

    res.send = function (body, ...args): Response {
      responseData = body
      return oldSend.call(res, body, ...args)
    }

    this.logger.log(
      `${method} ${originalUrl} - Headers: ${headers} - Query: ${queryParams} - Body: ${requestBody} - ${userAgent} ${ip}`,
      this.REQUEST_CTX
    )

    res.on('finish', (): void => {
      const { statusCode } = res
      const responseBody: string = this.getResponseBody(responseData)

      this.logResponse(statusCode, `${method} ${originalUrl} - ${statusCode} - ${responseBody} - ${userAgent} ${ip}`)
    })

    next()
  }

  private getUserAgent(req: Request): string {
    return req.get('user-agent') ?? String()
  }

  private getHeaders(req: Request): string {
    try {
      return JSON.stringify(req.headers)
    } catch (error) {
      this.logger.error(error, LoggingMiddleware.name)
      return String()
    }
  }

  private getBodyData(req: Request): string {
    try {
      return ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : String()
    } catch (error) {
      this.logger.error(error, LoggingMiddleware.name)
      return String()
    }
  }

  private getQueryParams(req: Request): string {
    try {
      return JSON.stringify(req.query)
    } catch (error) {
      this.logger.error(error, LoggingMiddleware.name)
      return String()
    }
  }

  private getResponseBody(payload: string | object): string {
    try {
      return typeof payload === 'object' ? JSON.stringify(payload) : payload
    } catch (error) {
      this.logger.error(error, LoggingMiddleware.name)
      return String()
    }
  }

  private logResponse(statusCode: number, message: string): void {
    if (statusCode >= 500) {
      this.logger.error(message, null, this.RESPONSE_CTX)
      return
    }

    if (statusCode >= 400) {
      this.logger.warn(message, this.RESPONSE_CTX)
      return
    }

    this.logger.log(message, this.RESPONSE_CTX)
  }
}
