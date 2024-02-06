import appConfig from '@app/config/configs/app.config'
import postgresConfig from '@app/config/configs/postgres.config'
import jwtConfig from '@app/config/configs/jwt.config'
import redisConfig from '@app/config/configs/redis.config'

export const configs = [appConfig, postgresConfig, jwtConfig, redisConfig]
export { appConfig, postgresConfig, jwtConfig, redisConfig }
