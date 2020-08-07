import { HttpPostClient } from '@/data/protocols/http'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'

export class RemoteSaveBarbecue implements SaveBarbecue {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteSaveBarbecue.Model[]>
  ) {}

  async save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model> {
    await this.httpPostClient.post({ url: this.url, body: barbecue })
    return null
  }
}

export namespace RemoteSaveBarbecue {
  export type Model = {
    id: string
    accountId: string
    date: string
    description: string
    observation: string
    valueSuggestDrink?: number
    valueSuggestFood?: number
    valueTotal?: number
    numParticipants?: number
    valueCollected?: number
  }
}
