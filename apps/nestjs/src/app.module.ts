import { APP_PIPE } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { Module, ValidationPipe } from '@nestjs/common'

import { PostgresModule } from '@app/db/postgres/postgres.module'
import { UsersModule } from '@app/resources/users/users.module'
import { AppConfigService } from '@app/config/app-config.service'
import { configs } from '@app/config/app.configs'
import validationSchema from '@app/config/validation.schema'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [...configs], validationSchema, isGlobal: true }),
    PostgresModule,
    UsersModule,
  ],
  providers: [AppConfigService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
