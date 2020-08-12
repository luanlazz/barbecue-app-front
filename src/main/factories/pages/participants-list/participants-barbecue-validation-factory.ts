import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export const makeSaveValidationBarbecue = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('date').required().build(),
    ...ValidationBuilder.field('description').required().min(5).build()
  ])
}
