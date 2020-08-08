import { LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'
import { mockBarbecuesModel, mockBarbecueModel } from '@/domain/test'

export class LoadBarbecueListSpy implements LoadBarbecueList {
  callsCount: number = 0
  barbecues = mockBarbecuesModel()

  async loadAll (): Promise<LoadBarbecueList.Model[]> {
    this.callsCount++
    return this.barbecues
  }
}

export class SaveBarbecueSpy implements SaveBarbecue {
  params: SaveBarbecue.Params
  result: SaveBarbecue.Model = mockBarbecueModel()

  async save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model> {
    this.params = barbecue
    return this.result
  }
}
