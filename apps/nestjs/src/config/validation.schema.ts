import * as Joi from 'joi'

import {
  DEFAULT_APP_NAME,
  DEFAULT_JWT_ACCESS_TOKEN_TTL,
  DEFAULT_JWT_REFRESH_TOKEN_TTL,
} from '@app/config/config.constants'
import { Environment } from '@app/config/enums/environment.enum'
import { LogLevel } from '@app/lib/winston/enums/log-level.enum'

export default Joi.object({
  // Environment
  NODE_ENV: Joi.string().valid(Environment.Development, Environment.Production, Environment.Test).required(),
  PORT: Joi.number().required(),
  // App
  APP_NAME: Joi.string().default(DEFAULT_APP_NAME),
  // Api
  API_VERSION: Joi.string().required(),
  API_PREFIX: Joi.string().required(),
  // Database
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_NAME: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(DEFAULT_JWT_ACCESS_TOKEN_TTL),
  JWT_REFRESH_TOKEN_TTL: Joi.number().default(DEFAULT_JWT_REFRESH_TOKEN_TTL),
  // Logger
  LOG_LEVEL: Joi.string()
    .valid(
      LogLevel.Emerg,
      LogLevel.Alert,
      LogLevel.Crit,
      LogLevel.Error,
      LogLevel.Warning,
      LogLevel.Notice,
      LogLevel.Info,
      LogLevel.Debug
    )
    .default(LogLevel.Debug),
})
