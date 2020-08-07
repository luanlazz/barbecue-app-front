import { LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'
import faker from 'faker'

export const mockBarbecueModel = (): LoadBarbecueList.Model => ({
  id: faker.random.uuid(),
  accountId: faker.random.uuid(),
  date: faker.date.recent(),
  description: faker.random.words(),
  observation: faker.random.words(),
  valueSuggestDrink: faker.random.number(),
  valueSuggestFood: faker.random.number(),
  valueTotal: faker.random.number(),
  numParticipants: faker.random.number(),
  valueCollected: faker.random.number()
})

export const mockBarbecueParams = (): SaveBarbecue.Params => ({
  date: faker.date.recent(),
  description: faker.random.words(),
  observation: faker.random.words(),
  valueSuggestDrink: faker.random.number(),
  valueSuggestFood: faker.random.number()
})

export const mockBarbecuesModel = (): LoadBarbecueList.Model[] => ([
  mockBarbecueModel(),
  mockBarbecueModel()
])

export type BarbecueModel = {
  id: string
  accountId: string
  date: Date
  description: string
  observation: string
  valueSuggestDrink?: number
  valueSuggestFood?: number
  valueTotal?: number
  numParticipants?: number
  valueCollected?: number
}
