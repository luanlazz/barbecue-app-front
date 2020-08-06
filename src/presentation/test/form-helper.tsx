import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, title: string, content: string): void => {
  const fieldStatus = screen.getByTestId(fieldName)
  expect(fieldStatus).toHaveProperty('title', title)
  expect(fieldStatus).toHaveProperty('textContent', content)
}

export const populateField = (fieldName: string, value: string = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
