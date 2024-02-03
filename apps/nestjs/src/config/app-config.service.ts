import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'

import { appConfig, postgresConfig } from '@app/config/app.configs'
import { Environment } from '@app/config/enums/environment.enum'

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    @Inject(postgresConfig.KEY)
    private readonly postgresConfiguration: ConfigType<typeof postgresConfig>
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
}
