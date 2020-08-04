import React, { useState, useEffect } from 'react'
import Styles from './signup-styles.scss'
import { Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email)
    })
  }, [state.name, state.email])

  return (
    <div className={Styles.signup}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Cadastro</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Digite a senha novamente' />

          <button data-testid='submit' disabled className={Styles.submit} type='submit'>
            Registrar
          </button>

          <span className={Styles.span}>Login</span>

          <FormStatus />

        </form>
      </Context.Provider>
    </div>
  )
}

export default SignUp
