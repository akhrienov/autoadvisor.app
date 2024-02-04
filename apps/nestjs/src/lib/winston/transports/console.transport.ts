import { transports, format } from 'winston'

import { TransformableInfo } from '@app/lib/winston/interfaces/transformable-info.interface'

export class ConsoleTransport {
  static create(): transports.ConsoleTransportInstance {
    return new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        format.ms(),
        format.printf(({ context, level, message, timestamp, ms }: TransformableInfo): string => {
          const paddedTimestamp: string = String(timestamp).padEnd(23, ' ')
          const paddedLogLevel: string = level.toUpperCase().padEnd(7, ' ')

          const logLevel: string = format.colorize().colorize(level, paddedLogLevel)
          const className: string = format.colorize().colorize(level, `[${String(context)}]`)
          const colorizedMessage: string = format.colorize().colorize(level, `${String(message)}`)
          const separator: string = format.colorize().colorize(level, '=>')

          return `${paddedTimestamp} ${logLevel} ${className} ${separator} ${colorizedMessage} \x1B[3m${ms}\x1B[0m`
        })
      ),
    })
  }
}
