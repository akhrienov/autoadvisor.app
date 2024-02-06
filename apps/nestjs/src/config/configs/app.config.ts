import { registerAs } from '@nestjs/config'

import { DEFAULT_API_PREFIX, DEFAULT_API_VERSION, DEFAULT_APP_NAME, DEFAULT_PORT } from '@app/config/config.constants'
import { ConfigKey } from '@app/config/enums/config-key.enum'
import { Environment } from '@app/config/enums/environment.enum'

export default registerAs(ConfigKey.APP, () => ({
  env: process.env.NODE_ENV ?? Environment.Development,
  port: parseInt(process.env.PORT ?? String(DEFAULT_PORT), 10),
  api: {
    prefix: process.env.API_PREFIX ?? DEFAULT_API_PREFIX,
    version: process.env.API_VERSION ?? DEFAULT_API_VERSION,
  },
  name: process.env.APP_NAME ?? DEFAULT_APP_NAME,
}))
