import { LoadParticipantsList, SaveParticipant } from '@/domain/usecases'
import faker from 'faker'

export const mockParticipantParams = (): SaveParticipant.Params => ({
  name: faker.name.findName(),
  pay: faker.random.boolean(),
  value: faker.random.number()
})

export const mockParticipantModel = (): LoadParticipantsList.Model => ({
  id: faker.random.uuid(),
  barbecueId: faker.random.uuid(),
  name: faker.name.findName(),
  pay: faker.random.boolean(),
  value: faker.random.number()
})

export const mockParticipantsModel = (): LoadParticipantsList.Model[] => ([
  mockParticipantModel(),
  mockParticipantModel()
])
