import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from './signup'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)
  return {
    sut
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testSubmitButtonDisable(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name-status', validationError, '🟡')
    Helper.testStatusForField(sut, 'email-status', validationError, '🟡')
    Helper.testStatusForField(sut, 'password-status', validationError, '🟡')
    Helper.testStatusForField(sut, 'passwordConfirmation-status', validationError, '🟡')
  })
})
