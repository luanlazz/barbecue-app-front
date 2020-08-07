import { LoadBarbecueList } from '@/domain/usecases'
import { mockBarbecuesModel } from '@/domain/test'

export class LoadBarbecueListSpy implements LoadBarbecueList {
  callsCount: number = 0
  barbecues = mockBarbecuesModel()

  async loadAll (): Promise<LoadBarbecueList.Model[]> {
    this.callsCount++
    return this.barbecues
  }
}
