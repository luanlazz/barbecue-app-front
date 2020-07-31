import { AccountModel } from '@/domain/models/account-model'

type AuthParams = {
  email: string
  password: string
}

export interface Authentication {
  auth(params: AuthParams): Promise<AccountModel>
}
