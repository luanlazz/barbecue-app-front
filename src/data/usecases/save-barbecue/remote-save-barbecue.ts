import { HttpClient } from '@/data/protocols/http'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'

export class RemoteSaveBarbecue implements SaveBarbecue {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveBarbecue.Model[]>
  ) {}

  async save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: barbecue
    })
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
