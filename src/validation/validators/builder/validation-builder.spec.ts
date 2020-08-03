import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const validations = sut.field(field).min(minLength).build()
    expect(validations).toEqual([new MinLengthValidation(field, minLength)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const minLength = faker.random.number()
    const validations = sut.field(field).required().min(minLength).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, minLength),
      new EmailValidation(field)
    ])
  })
})
