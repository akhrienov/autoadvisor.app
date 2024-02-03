import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AppConfigService } from '@app/config/app-config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      extraProviders: [AppConfigService],
      useFactory: ({ isProduction, postgresConfigs }: AppConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: postgresConfigs.host,
        port: postgresConfigs.port,
        username: postgresConfigs.username,
        password: postgresConfigs.password,
        database: postgresConfigs.database,
        autoLoadEntities: true,
        synchronize: !isProduction,
      }),
    }),
  ],
})
export class PostgresModule {}
