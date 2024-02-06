import { registerAs } from '@nestjs/config'

import { DEFAULT_JWT_ACCESS_TOKEN_TTL, DEFAULT_JWT_REFRESH_TOKEN_TTL } from '@app/config/config.constants'
import { ConfigKey } from '@app/config/enums/config-key.enum'

export default registerAs(ConfigKey.JWT, () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? String(DEFAULT_JWT_ACCESS_TOKEN_TTL), 10),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? String(DEFAULT_JWT_REFRESH_TOKEN_TTL), 10),
}))
