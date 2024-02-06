import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'

import { Environment } from '@app/config/enums/environment.enum'
import { appConfig, postgresConfig, jwtConfig } from '@app/config'

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @Inject(postgresConfig.KEY)
    private readonly postgresConfiguration: ConfigType<typeof postgresConfig>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  get isProduction(): boolean {
    return this.appConfiguration.env === (Environment.Production as string)
  }

  get appConfigs(): ConfigType<typeof appConfig> {
    return this.appConfiguration
  }

  get postgresConfigs(): ConfigType<typeof postgresConfig> {
    return this.postgresConfiguration
  }

  get jwtConfigs(): ConfigType<typeof jwtConfig> {
    return this.jwtConfiguration
  }
}
