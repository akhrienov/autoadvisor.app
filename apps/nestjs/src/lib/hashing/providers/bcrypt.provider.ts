import { Injectable } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcrypt'

import { HashingService } from '@app/lib/hashing/hashing.service'

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt: string = await genSalt()
    return hash(data, salt)
  }

  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted)
  }
}
