import validationSchema from '@app/config/validation.schema'
import appConfiguration from '@app/config/namespaces/app.namespace'
import postgresConfiguration from '@app/config/namespaces/postgres.namespace'
import jwtConfiguration from '@app/config/namespaces/jwt.namespace'
import redisConfiguration from '@app/config/namespaces/redis.namespace'

export { appConfiguration, postgresConfiguration, jwtConfiguration, redisConfiguration }
export const configOptions = {
  load: [appConfiguration, postgresConfiguration, jwtConfiguration, redisConfiguration],
  validationSchema,
  isGlobal: true,
}
