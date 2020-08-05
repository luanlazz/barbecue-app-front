import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/usecases'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
