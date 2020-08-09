import { LoadParticipantsList } from '@/domain/usecases'
import { mockParticipantsModel } from '@/domain/test'

export class LoadParticipantsListSpy implements LoadParticipantsList {
  callsCount: number = 0
  barbecues = mockParticipantsModel()

  async loadAll (): Promise<LoadParticipantsList.Model[]> {
    this.callsCount++
    return this.barbecues
  }
}
