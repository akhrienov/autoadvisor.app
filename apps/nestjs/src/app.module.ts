import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { Module, ValidationPipe } from '@nestjs/common'

import { PostgresModule } from '@app/db/postgres/postgres.module'
import { UsersModule } from '@app/resources/users/users.module'
import { IamModule } from '@app/iam/iam.module'
import { CommonModule } from '@app/common/common.module'
import { AppConfigService } from '@app/config/app-config.service'
import { HttpErrorFilter } from '@app/common/filters/http-error.filter'
import { WrapResponseInterceptor } from '@app/common/interceptors/wrap-response.interceptor'
import { TimeoutInterceptor } from '@app/common/interceptors/timeout.interceptor'
import validationSchema from '@app/config/validation.schema'
import { configs } from '@app/config'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [...configs], validationSchema, isGlobal: true }),
    PostgresModule,
    UsersModule,
    IamModule,
    CommonModule,
  ],
  providers: [
    AppConfigService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: WrapResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule {}
