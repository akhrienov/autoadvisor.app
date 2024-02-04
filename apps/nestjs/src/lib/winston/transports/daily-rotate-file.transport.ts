import DailyRotateFile = require('winston-daily-rotate-file')

import { LogLevel } from '@app/lib/winston/enums/log-level.enum'

export class DailyRotateFileTransport {
  static create() {
    return new DailyRotateFile({
      level: LogLevel.Info,
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    })
  }
}
