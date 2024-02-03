import helmet from 'helmet'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import type { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from '@app/app.module'
import { AppConfigService } from '@app/config/app-config.service'
import { WinstonLogger } from '@app/lib/winston/winston.logger'

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({ instance: WinstonLogger.create() }),
  })
  const appConfig = app.get(AppConfigService).appConfigs

  app.use(helmet())

  app.setGlobalPrefix(`${appConfig.api.prefix}/${appConfig.api.version}`)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  await app.listen(appConfig.port)
}

void bootstrap()
