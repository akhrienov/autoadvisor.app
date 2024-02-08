import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { MESSAGES, STATUSES } from '@app/common/constants'

@Injectable()
export class WrapResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: STATUSES.RESPONSE_SUCCESS,
        data,
        message: (data && data.message) ?? MESSAGES.RESPONSE_SUCCESS,
      }))
    )
  }
}
