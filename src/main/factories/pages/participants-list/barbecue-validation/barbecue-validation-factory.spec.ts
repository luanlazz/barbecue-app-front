import { makeSaveBarbecueValidation } from './barbecue-validation-factory'
import { ValidationComposite, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators'

describe('makeSaveBarbecueValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSaveBarbecueValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('date'),
      new RequiredFieldValidation('description'),
      new MinLengthValidation('description', 5)
    ]))
  })
})
