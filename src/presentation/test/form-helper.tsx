import { RenderResult } from '@testing-library/react'

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
