import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common'

import { LoggingMiddleware } from '@app/common/middlewares/logging.middleware'

@Module({
  providers: [Logger],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
