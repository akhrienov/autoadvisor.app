import { registerAs } from '@nestjs/config'

import {
  DEFAULT_PORT,
  DEFAULT_APP_NAME,
  DEFAULT_API_PREFIX,
  DEFAULT_API_VERSION,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_HOST,
} from '@app/config/config.constants'
import { ConfigKey } from '@app/config/enums/config-key.enum'
import { Environment } from '@app/config/enums/environment.enum'

export const appConfig = registerAs(ConfigKey.APP, () => ({
  env: process.env.NODE_ENV ?? Environment.Development,
  port: parseInt(process.env.PORT ?? DEFAULT_PORT.toString(), 10),
  api: {
    prefix: process.env.API_PREFIX ?? DEFAULT_API_PREFIX,
    version: process.env.API_VERSION ?? DEFAULT_API_VERSION,
  },
  name: process.env.APP_NAME ?? DEFAULT_APP_NAME,
}))

export const postgresConfig = registerAs(ConfigKey.POSTGRES, () => ({
  host: process.env.POSTGRES_HOST ?? DEFAULT_POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? DEFAULT_POSTGRES_PORT.toString(), 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
}))

export const configs = [appConfig, postgresConfig]
