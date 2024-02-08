import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'

import { Environment } from '@app/config/enums/environment.enum'
import { appConfiguration, postgresConfiguration } from '@app/config/configurations'

@Injectable()
export class ConfigService {
  constructor(
    @Inject(appConfiguration.KEY)
    private readonly appConfig: ConfigType<typeof appConfiguration>,
    @Inject(postgresConfiguration.KEY)
    private readonly postgresConfig: ConfigType<typeof postgresConfiguration>
  ) {}

  get isProduction(): boolean {
    return this.appConfig.env === (Environment.Production as string)
  }

  get appConfigs(): ConfigType<typeof appConfiguration> {
    return this.appConfig
  }

  get postgresConfigs(): ConfigType<typeof postgresConfiguration> {
    return this.postgresConfig
  }
}
