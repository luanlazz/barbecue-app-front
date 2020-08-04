import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import { Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Cadastro</h2>

          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Digite a senha novamente' />

          <button className={Styles.submit} type='submit'>
            Registrar
          </button>

          <Link to="/signup" className={Styles.link}>Login</Link>

          <FormStatus />

        </form>
      </Context.Provider>
    </div>
  )
}

export default SignUp
