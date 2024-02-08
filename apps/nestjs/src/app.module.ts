import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { Module, ValidationPipe } from '@nestjs/common'

import { PostgresModule } from '@app/db/postgres/postgres.module'
import { UsersModule } from '@app/resources/users/users.module'
import { IamModule } from '@app/iam/iam.module'
import { CommonModule } from '@app/common/common.module'
import { ConfigService } from '@app/config/config.service'
import { WrapHttpErrorFilter } from '@app/common/filters/wrap-http-error.filter'
import { WrapResponseInterceptor } from '@app/common/interceptors/wrap-response.interceptor'
import { TimeoutInterceptor } from '@app/common/interceptors/timeout.interceptor'
import { configOptions } from '@app/config/configurations'

@Module({
  imports: [ConfigModule.forRoot(configOptions), PostgresModule, CommonModule, IamModule, UsersModule],
  providers: [
    ConfigService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: WrapHttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: WrapResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule {}
