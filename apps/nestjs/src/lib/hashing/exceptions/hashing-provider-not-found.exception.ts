export class HashingProviderNotFoundException extends Error {
  constructor(provider: string) {
    super(`Hashing provider '${provider}' not found`)
    this.name = this.constructor.name
  }
}
