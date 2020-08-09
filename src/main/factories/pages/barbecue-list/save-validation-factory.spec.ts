import { makeSaveValidation } from './save-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('SaveValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSaveValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('date').required().build(),
      ...ValidationBuilder.field('description').required().min(5).build()
    ]))
  })
})
