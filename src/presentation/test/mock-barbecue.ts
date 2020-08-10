import { LoadBarbecueById, LoadBarbecueList, SaveBarbecue } from '@/domain/usecases'
import { mockBarbecuesModel, mockBarbecueModel } from '@/domain/test'

export class LoadBarbecueListSpy implements LoadBarbecueList {
  callsCount: number = 0
  barbecues = mockBarbecuesModel()

  async loadAll (): Promise<LoadBarbecueList.Model[]> {
    this.callsCount++
    return this.barbecues
  }
}

export class LoadBarbecueByIdSpy implements LoadBarbecueById {
  callsCount: number = 0
  barbecue = mockBarbecueModel()

  async loadById (): Promise<LoadBarbecueById.Model> {
    this.callsCount++
    return this.barbecue
  }
}

export class SaveBarbecueSpy implements SaveBarbecue {
  callsCount: number = 0
  params: SaveBarbecue.Params
  result: SaveBarbecue.Model = mockBarbecueModel()

  async save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model> {
    this.callsCount++
    this.params = barbecue
    return this.result
  }
}
