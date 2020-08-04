import React from 'react'
import { render, RenderResult, cleanup } from '@testing-library/react'
import SignUp from './signup'
import { Helper, ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <SignUp
      validation={validationStub}
    />)
  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testSubmitButtonDisable(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name-status', validationError, '🟡')
    Helper.testStatusForField(sut, 'email-status', validationError, '🟡')
    Helper.testStatusForField(sut, 'password-status', 'Campo obrigatório', '🟡')
    Helper.testStatusForField(sut, 'passwordConfirmation-status', 'Campo obrigatório', '🟡')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name-status', validationError, '🟡')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email-status', validationError, '🟡')
  })
})
