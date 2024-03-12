import { ApiConfig } from '@/configs/interfaces/api-config.interface'
import { DEFAULT_API_BASE_URL, DEFAULT_BACKEND_BASE_URL } from '@/configs/constants'

export const apiConfig: ApiConfig = {
  baseUrl: {
    api: process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    backend: process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? DEFAULT_BACKEND_BASE_URL,
  },
}
