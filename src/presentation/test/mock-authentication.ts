import { Authentication, AuthParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthParams

  async auth (params: AuthParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
