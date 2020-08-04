import { AccountModel } from '@/domain/models'

export type AuthParams = {
  email: string
  password: string
}

export interface Authentication {
  auth(params: AuthParams): Promise<AccountModel>
}
