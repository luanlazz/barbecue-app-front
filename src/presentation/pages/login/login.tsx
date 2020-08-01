import React from 'react'
import Styles from './login-styles.scss'
import { Spinner, Input, FormStatus } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type='email' name='email' placeholder='email' />
        <Input type='password' name='password' placeholder='senha' />

        <button className={Styles.submit} type='submit'>
          <Spinner />
          Entrar
        </button>

        <span className={Styles.link}>Criar conta</span>

        <FormStatus />

      </form>
    </div>
  )
}

export default Login
