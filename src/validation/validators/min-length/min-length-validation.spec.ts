import { MinLengthValidation } from './min-length-validation'
import { MinLengthError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string = faker.database.column(), minLength: number = 5): MinLengthValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  test('Should return error if value is minus than min length', () => {
    const field = faker.database.column()
    const minLength = 5
    const sut = makeSut(field, minLength)
    const error = sut.validate('')
    expect(error).toEqual(new MinLengthError(field, minLength))
  })
})
