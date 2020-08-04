import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string, valueToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, valueToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return error if values are different', () => {
    const field = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(field, valueToCompare)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const value = faker.random.word()
    const valueToCompare = value
    const sut = makeSut(field, valueToCompare)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
