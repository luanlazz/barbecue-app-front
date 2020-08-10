import { HttpClient } from '@/data/protocols/http'
import { LoadBarbecueById } from '@/domain/usecases'

export class RemoteLoadBarbecueById implements LoadBarbecueById {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadBarbecueById.Model>
  ) {}

  async loadById (): Promise<LoadBarbecueById.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    return null
  }
}

export namespace RemoteLoadBarbecueById {
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
