import { registerAs } from '@nestjs/config'

import { DEFAULT_POSTGRES_HOST, DEFAULT_POSTGRES_PORT } from '@app/config/config.constants'
import { ConfigKey } from '@app/config/enums/config-key.enum'

export default registerAs(ConfigKey.POSTGRES, () => ({
  host: process.env.POSTGRES_HOST ?? DEFAULT_POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? String(DEFAULT_POSTGRES_PORT), 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
}))
