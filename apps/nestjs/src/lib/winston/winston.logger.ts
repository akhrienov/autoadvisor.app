import { createLogger, Logger, transports, format } from 'winston'
import { utilities } from 'nest-winston'

import config from '@app/lib/winston/config/winston.config'

export class WinstonLogger {
  static create(): Logger {
    return createLogger({
      level: config.logLevel,
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike(config.appName, { colors: true, prettyPrint: true })
          ),
        }),
      ],
    })
  }
}
