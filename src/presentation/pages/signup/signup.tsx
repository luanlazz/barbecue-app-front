import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { Input, FormStatus, SubmitButton } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()

      setState({
        ...state,
        isLoading: true
      })

      if (state.isLoading || state.isFormInvalid) return

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password ,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)

      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.signup}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <Context.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Digite a senha novamente' />

          <SubmitButton text='Cadastrar' />

          <Link data-testid='login-link' replace to='/login' className={Styles.span}>Login</Link>

          <FormStatus />

        </form>
      </Context.Provider>
    </div>
  )
}

export default SignUp
