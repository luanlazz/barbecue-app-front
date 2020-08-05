import React, { lazy } from 'react'
import { makeLoginValidation } from './login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

const Login = lazy(async () => import('@/presentation/pages/login/login'))

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
