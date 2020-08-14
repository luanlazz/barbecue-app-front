import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import TextArea from './textarea'
import Context from '@/presentation/contexts/form/form-context'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <TextArea name={fieldName} />
    </Context.Provider>)
}

describe('TextArea Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })
})
