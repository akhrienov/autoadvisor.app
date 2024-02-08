import { Module, DynamicModule } from '@nestjs/common'

import { HashingService } from '@app/lib/hashing/hashing.service'
import { hashingServiceFactory } from '@app/lib/hashing/hashing.factory'

@Module({})
export class HashingModule {
  static register(hashingProvider: string): DynamicModule {
    return {
      module: HashingModule,
      providers: [
        {
          provide: 'HASHING_PROVIDER',
          useValue: hashingProvider,
        },
        hashingServiceFactory,
      ],
      exports: [HashingService],
    }
  }
}
