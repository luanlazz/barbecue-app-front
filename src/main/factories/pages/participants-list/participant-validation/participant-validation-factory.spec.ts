import { makeSaveParticipantValidation } from './participant-validation-factory'
import { ValidationComposite, RequiredFieldValidation, MinLengthValidation } from '@/validation/validators'

describe('makeSaveParticipantValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSaveParticipantValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 2)
    ]))
  })
})
