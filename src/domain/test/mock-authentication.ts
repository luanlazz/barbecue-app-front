import { AuthParams } from '@/domain/usecases/authentication'
import faker from 'faker'

export const mockAuthentication = (): AuthParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
