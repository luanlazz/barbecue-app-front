import { AuthParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

export const mockAuthentication = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  accessToken: faker.random.uuid()
})
