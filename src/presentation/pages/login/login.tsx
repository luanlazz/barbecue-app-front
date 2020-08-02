import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Spinner, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='email' />
          <Input type='password' name='password' placeholder='senha' />

          <button data-testid='btn-submit' className={Styles.submit} type='submit'>
            {state.isLoading && <Spinner />}
            Entrar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />

        </form>
      </Context.Provider>
    </div>
  )
}

export default Login
