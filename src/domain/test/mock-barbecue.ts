import { BarbecueModel } from '@/domain/models'
import faker from 'faker'

export const mockBarbecueModel = (): BarbecueModel => ({
  id: faker.random.uuid(),
  accountId: faker.random.uuid(),
  date: faker.date.future(),
  description: faker.random.words(),
  observation: faker.random.words(),
  valueSuggestDrink: faker.random.number(),
  valueSuggestFood: faker.random.number(),
  valueTotal: faker.random.number(),
  numParticipants: faker.random.number(),
  valueCollected: faker.random.number()
})

export const mockBarbecuesModel = (): BarbecueModel[] => ([
  mockBarbecueModel(),
  mockBarbecueModel()
])
