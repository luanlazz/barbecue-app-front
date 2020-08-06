import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testSubmitButtonDisable = (fieldName: string, isDisable: boolean): void => {
  const buttonSubmit = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(buttonSubmit.disabled).toBe(isDisable)
}

export const testStatusForField = (fieldName: string, title: string, content: string): void => {
  const fieldStatus = screen.getByTestId(fieldName)
  expect(fieldStatus.title).toBe(title)
  expect(fieldStatus.textContent).toBe(content)
}

export const populateField = (fieldName: string, value: string = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
