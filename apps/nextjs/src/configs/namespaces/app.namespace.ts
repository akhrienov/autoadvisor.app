import { AppConfig } from '@/configs/interfaces/app-config.interface'
import { DEFAULT_BASE_URL, DEFAULT_APP_NAME, APP_LONG_DESCRIPTION, APP_SHORT_DESCRIPTION } from '@/configs/constants'

export const appConfig: AppConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? DEFAULT_BASE_URL,
  name: process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME,
  shortDescription: APP_SHORT_DESCRIPTION,
  longDescription: APP_LONG_DESCRIPTION,
}
