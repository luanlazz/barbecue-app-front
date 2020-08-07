import { AddAccount, Authentication } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAccountModel = (): Authentication.Model => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  accessToken: faker.random.uuid()
})
