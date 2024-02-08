import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { ConfigService } from '@app/config/config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      extraProviders: [ConfigService],
      useFactory: ({ isProduction, postgresConfigs }: ConfigService): TypeOrmModuleOptions => ({
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
