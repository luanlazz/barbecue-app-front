import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/validators/test'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should error if any validation fails', () => {
    const field = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(field)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should ', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, faker.random.word())
    expect(error).toBeFalsy()
  })
})
