import { HashingService } from '@app/lib/hashing/hashing.service'
import { BcryptService } from '@app/lib/hashing/providers/bcrypt.provider'
import { HashingProvider } from '@app/lib/hashing/enums/hashing-provider.enum'
import { HashingProviderNotFoundException } from '@app/lib/hashing/exceptions/hashing-provider-not-found.exception'

export const hashingServiceFactory = {
  provide: HashingService,
  useFactory: (hashingProvider: HashingProvider): HashingService => {
    switch (hashingProvider) {
      case HashingProvider.BCRYPT:
        return new BcryptService()
      default:
        throw new HashingProviderNotFoundException(hashingProvider)
    }
  },
  inject: ['HASHING_PROVIDER'],
}
