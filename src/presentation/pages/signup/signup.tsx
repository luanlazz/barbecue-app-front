import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { Input, Header, FormStatus, SubmitButton, SecondaryButton } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault()

      setState(old => ({
        ...old,
        isLoading: true,
        mainError: ''
      }))

      if (state.isLoading || state.isFormInvalid) return

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password ,
        passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signupWrap}>
      <Header />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro</h2>

          <Input type='text' name='name' placeholder='nome' />
          <Input type='email' name='email' placeholder='e-mail' />
          <Input type='password' name='password' placeholder='senha' />
          <Input type='password' name='passwordConfirmation' placeholder='senha novamente' />

          <div className={Styles.buttons}>
            <SecondaryButton data-testid='login-link' replace to='/login'>
              Login
            </SecondaryButton>
            <span className={Styles.optionText}>ou</span>
            <SubmitButton text='Cadastrar' icon={<FontAwesomeIcon icon={faSignInAlt} />} />
          </div>

          <FormStatus />

        </form>
      </FormContext.Provider>
    </div>
  )
}

export default SignUp
