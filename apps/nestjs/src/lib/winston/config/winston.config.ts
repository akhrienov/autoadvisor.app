import { Environment } from '@app/config/enums/environment.enum'
import { DEFAULT_APP_NAME } from '@app/config/constants'
import { DEFAULT_LOG_LEVEL } from '@app/lib/winston/constants'

export default {
  appName: process.env.APP_NAME ?? DEFAULT_APP_NAME,
  environment: process.env.NODE_ENV ?? Environment.Development,
  logLevel: process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL,
}
