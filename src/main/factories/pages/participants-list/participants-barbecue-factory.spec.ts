import { makeSaveValidationBarbecue } from './participants-barbecue-validation-factory'
import { ValidationComposite, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators'

describe('makeSaveValidationBarbecueFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSaveValidationBarbecue()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('date'),
      new RequiredFieldValidation('description'),
      new MinLengthValidation('description', 5)
    ]))
  })
})
