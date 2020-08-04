import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testSubmitButtonDisable = (sut: RenderResult, fieldName: string, isDisable: boolean): void => {
  const buttonSubmit = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(buttonSubmit.disabled).toBe(isDisable)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, title: string, content: string): void => {
  const fieldStatus = sut.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(title)
  expect(fieldStatus.textContent).toBe(content)
}

export const populateField = (sut: RenderResult, fieldName: string, value: string = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
