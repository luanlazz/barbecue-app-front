import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)
  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

const testSubmitButtonDisable = (sut: RenderResult, fieldName: string, isDisable: boolean): void => {
  const buttonSubmit = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(buttonSubmit.disabled).toBe(isDisable)
}

const testStatusForField = (sut: RenderResult, fieldName: string, title: string, content: string): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(title)
  expect(fieldStatus.textContent).toBe(content)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'error-wrap', 0)
    testSubmitButtonDisable(sut, 'submit', true)
    testStatusForField(sut, 'name-status', validationError, '🟡')
    testStatusForField(sut, 'email-status', validationError, '🟡')
    testStatusForField(sut, 'password-status', validationError, '🟡')
    testStatusForField(sut, 'passwordConfirmation-status', validationError, '🟡')
  })
})
