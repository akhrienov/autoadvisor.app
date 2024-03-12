import { EnvConfig } from '@/configs/interfaces/env-config.interface'
import { DEFAULT_ENVIRONMENT } from '@/configs/constants'

export const envConfig: EnvConfig = {
  environment: process.env.NODE_ENV ?? DEFAULT_ENVIRONMENT,
}
