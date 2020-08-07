import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadBarbecueList } from '@/domain/usecases/barbecue/load-barbecue-list'

export class RemoteLoadBarbecueList implements LoadBarbecueList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadBarbecueList.Model[]>
  ) {}

  async loadAll (): Promise<LoadBarbecueList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    const remoteBarbecues = httpResponse.body || []

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return remoteBarbecues.map(barbecue => ({
        ...barbecue,
        date: new Date(barbecue.date)
      }))
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadBarbecueList {
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
