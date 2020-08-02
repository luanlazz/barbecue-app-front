import React from 'react'
import faker from 'faker'
import Login from './login'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

const populateEmailField = (sut: RenderResult, email: string = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password: string = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (sut: RenderResult, email: string = faker.internet.email(), password: string = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const buttonSubmit = sut.getByTestId('btn-submit') as HTMLButtonElement
  fireEvent.click(buttonSubmit)
}

const simulateStatusFormField = (sut: RenderResult, fieldName: string, title?: string, content: string): void => {
  const emailStatus = sut.getByTestId(fieldName)
  expect(emailStatus.title).toBe(title)
  expect(emailStatus.textContent).toBe(content)
}

describe('', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const buttonSubmit = sut.getByTestId('btn-submit') as HTMLButtonElement
    expect(buttonSubmit.textContent).toBe('Entrar')
    expect(buttonSubmit.childNodes.length).toBe(1)
    expect(buttonSubmit.disabled).toBe(true)
    simulateStatusFormField(sut, 'email-status', validationError, '🟡')
    simulateStatusFormField(sut, 'password-status', validationError, '🟡')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusFormField(sut, 'email-status', validationError, '🟡')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    simulateStatusFormField(sut, 'password-status', validationError, '🟡')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusFormField(sut, 'email-status', 'Tudo ok!', '✔️')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    simulateStatusFormField(sut, 'password-status', 'Tudo ok!', '✔️')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    const buttonSubmit = sut.getByTestId('btn-submit') as HTMLButtonElement
    expect(buttonSubmit.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const buttonSubmit = sut.getByTestId('btn-submit') as HTMLButtonElement
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
    expect(buttonSubmit.childNodes.length).toBe(1)
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
