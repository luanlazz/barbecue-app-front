import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
