import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <h2>Agenda de Churras</h2>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrap}>
          <input type='email' name='email' placeholder='e-mail' />
          <span className={Styles.status}>🔴</span>
        </div>

        <div className={Styles.inputWrap}>
          <input type='password' name='password' placeholder='senha' />
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type='submit'>
          <Spinner />
          Entrar
        </button>

        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <span className={Styles.error}>Erro</span>
        </div>

      </form>
    </div>
  )
}

export default Login
