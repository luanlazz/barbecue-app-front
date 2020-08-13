import { LoadParticipantsList, SaveParticipant } from '@/domain/usecases'
import { mockParticipantsModel, mockParticipantModel } from '@/domain/test'

export class LoadParticipantsListSpy implements LoadParticipantsList {
  callsCount: number = 0
  barbecues = mockParticipantsModel()

  async loadAll (): Promise<LoadParticipantsList.Model[]> {
    this.callsCount++
    return this.barbecues
  }
}

export class SaveParticipantSpy implements SaveParticipant {
  callsCount: number = 0
  params: SaveParticipant.Params
  result: SaveParticipant.Model = mockParticipantModel()

  async save (participant: SaveParticipant.Params): Promise<SaveParticipant.Model> {
    this.callsCount++
    this.params = participant
    return this.result
  }
}
