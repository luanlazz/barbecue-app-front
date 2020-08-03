import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: Number
  ) {}

  validate (value: string): Error {
    return value.length < this.minLength ? new MinLengthError(this.field, this.minLength) : null
  }
}
