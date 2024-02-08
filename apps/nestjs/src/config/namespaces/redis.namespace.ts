import { registerAs } from '@nestjs/config'

import { DEFAULT_REDIS_HOST, DEFAULT_REDIS_PORT } from '@app/config/constants'
import { ConfigKey } from '@app/config/enums/config-key.enum'

export default registerAs(ConfigKey.REDIS, () => ({
  host: process.env.REDIS_HOST ?? DEFAULT_REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? String(DEFAULT_REDIS_PORT), 10),
}))
