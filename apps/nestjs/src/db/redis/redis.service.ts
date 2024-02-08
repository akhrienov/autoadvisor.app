import { Injectable, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import Redis from 'ioredis'

import { redisConfiguration } from '@app/config/configurations'

@Injectable()
export class RedisService implements OnApplicationBootstrap, OnApplicationShutdown {
  private redisClient: Redis

  constructor(
    @Inject(redisConfiguration.KEY)
    private readonly redisConfig: ConfigType<typeof redisConfiguration>
  ) {}

  onApplicationBootstrap(): void {
    this.redisClient = new Redis({
      host: this.redisConfig.host,
      port: this.redisConfig.port,
    })
  }

  onApplicationShutdown(): Promise<'OK'> {
    return this.redisClient.quit()
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value)
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key)
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key)
  }
}
