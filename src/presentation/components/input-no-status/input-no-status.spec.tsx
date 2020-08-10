import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './input-no-status'
import Context from '@/presentation/contexts/form/form-context'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>)
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBeFalsy()
  })
})
