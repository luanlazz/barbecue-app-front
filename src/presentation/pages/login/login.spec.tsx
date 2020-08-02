import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const buttonSubmit = getByTestId('btn-submit') as HTMLButtonElement
    expect(buttonSubmit.textContent).toBe('Entrar')
    expect(buttonSubmit.childNodes.length).toBe(1)
    expect(buttonSubmit.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
