import { makeSaveValidation } from './save-validation-factory'
import { ValidationComposite, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators'

describe('SaveValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSaveValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('date'),
      new RequiredFieldValidation('description'),
      new MinLengthValidation('description', 5)
    ]))
  })
})
