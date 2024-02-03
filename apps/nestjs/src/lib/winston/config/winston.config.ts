import { DEFAULT_APP_NAME } from '@app/config/config.constants'
import { DEFAULT_LOG_LEVEL } from '@app/lib/winston/winston.constants'

export default {
  appName: process.env.APP_NAME ?? DEFAULT_APP_NAME,
  logLevel: process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL,
}
