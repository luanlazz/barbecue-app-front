import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthError } from '@/validation/errors'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: Number
  ) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLength ? new MinLengthError(this.field, this.minLength) : null
  }
}
