import { LoadParticipantsList } from '@/domain/usecases'
import faker from 'faker'

export const mockRemoteParticipantModel = (): LoadParticipantsList.Model => ({
  id: faker.random.uuid(),
  barbecueId: faker.random.uuid(),
  name: faker.name.findName(),
  pay: faker.random.boolean(),
  value: faker.random.number()
})

export const mockRemoteParticipantsModel = (): LoadParticipantsList.Model[] => ([
  mockRemoteParticipantModel(),
  mockRemoteParticipantModel()
])
