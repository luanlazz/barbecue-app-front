import { RemoteLoadBarbecueList } from '@/data/usecases/load-barbecue-list/remote-load-barbecue-list'
import faker from 'faker'

export const mockRemoteBarbecueModel = (): RemoteLoadBarbecueList.Model => ({
  id: faker.random.uuid(),
  accountId: faker.random.uuid(),
  date: faker.date.recent().toISOString(),
  description: faker.random.words(),
  observation: faker.random.words(),
  valueSuggestDrink: faker.random.number(),
  valueSuggestFood: faker.random.number(),
  valueTotal: faker.random.number(),
  numParticipants: faker.random.number(),
  valueCollected: faker.random.number()
})

export const mockRemoteBarbecuesModel = (): RemoteLoadBarbecueList.Model[] => ([
  mockRemoteBarbecueModel(),
  mockRemoteBarbecueModel()
])
