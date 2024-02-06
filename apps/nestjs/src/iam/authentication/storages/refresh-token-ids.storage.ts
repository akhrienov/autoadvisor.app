import { Injectable } from '@nestjs/common'

import { RedisService } from '@app/db/redis/redis.service'
import { InvalidateRefreshTokenException } from '@app/iam/authentication/exceptions/invalidate-refresh-token.exception'

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private readonly redisService: RedisService) {}

  async insert(userId: string, tokenId: string): Promise<void> {
    await this.redisService.set(this.getKey(userId), tokenId)
  }

  async validate(userId: string, tokenId: string): Promise<boolean> {
    const storedId: string | null = await this.redisService.get(this.getKey(userId))

    if (storedId !== tokenId) {
      throw new InvalidateRefreshTokenException()
    }

    return storedId === tokenId
  }

  async invalidate(userId: string): Promise<void> {
    await this.redisService.del(this.getKey(userId))
  }

  private getKey(userId: string): string {
    return `user-${userId}`
  }
}
