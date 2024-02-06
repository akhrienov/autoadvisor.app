import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { RESPONSE_SUCCESS_MESSAGE, RESPONSE_SUCCESS_STATUS } from '@app/common/common.constants'

@Injectable()
export class WrapResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: RESPONSE_SUCCESS_STATUS,
        data,
        message: data.message ?? RESPONSE_SUCCESS_MESSAGE,
      }))
    )
  }
}
