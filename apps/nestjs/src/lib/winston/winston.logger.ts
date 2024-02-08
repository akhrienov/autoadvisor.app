import { createLogger, Logger } from 'winston'

import { ConsoleTransport } from '@app/lib/winston/transports/console.transport'
import { DailyRotateFileTransport } from '@app/lib/winston/transports/daily-rotate-file.transport'
import { Environment } from '@app/config/enums/environment.enum'
import config from '@app/lib/winston/config/winston.config'

export class WinstonLogger {
  static create(): Logger {
    const transports: any[] = [ConsoleTransport.create()]

    if (config.environment !== String(Environment.Development)) {
      transports.push(DailyRotateFileTransport.create())
    }

    return createLogger({
      level: config.logLevel,
      transports,
    })
  }
}
