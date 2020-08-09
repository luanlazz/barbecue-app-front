import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import { Input, Header, FormStatus, SubmitButton, SecondaryButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({
        ...old,
        isLoading: true,
        mainError: ''
      }))

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)

      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <Header />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type='email' name='email' placeholder='email' />
          <Input type='password' name='password' placeholder='senha' />

          <div className={Styles.buttons}>
            <SecondaryButton data-testid="signup-link" to="/signup">
              Criar conta
            </SecondaryButton>
            <SubmitButton text='Entrar' />
          </div>

          <FormStatus />

        </form>
      </FormContext.Provider>
    </div>
  )
}

export default Login
