import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (value: string): Error {
    return new MinLengthError(this.field, this.minLength)
  }
}
