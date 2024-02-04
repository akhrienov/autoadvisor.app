import { createLogger, Logger } from 'winston'

import { ConsoleTransport } from '@app/lib/winston/transports/console.transport'
import { DailyRotateFileTransport } from '@app/lib/winston/transports/daily-rotate-file.transport'
import config from '@app/lib/winston/config/winston.config'

export class WinstonLogger {
  static create(): Logger {
    return createLogger({
      level: config.logLevel,
      transports: [ConsoleTransport.create(), DailyRotateFileTransport.create()],
    })
  }
}
