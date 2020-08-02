import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import { Spinner, Input, FormStatus } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: '',
    emailError: 'Campo obrigatório',
    password: '',
    passwordError: 'Campo obrigatório'
  })

  useEffect(() => {
    validation.validate('email', state.email)
  }, [state.email])

  useEffect(() => {
    validation.validate('password', state.password)
  }, [state.password])

  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='email' />
          <Input type='password' name='password' placeholder='senha' />

          <button data-testid='btn-submit' disabled className={Styles.submit} type='submit'>
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
