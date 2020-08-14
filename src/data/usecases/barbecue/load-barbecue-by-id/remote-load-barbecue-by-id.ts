import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadBarbecueById } from '@/domain/usecases'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'

export class RemoteLoadBarbecueById implements LoadBarbecueById {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadBarbecueById.Model>
  ) {}

  async loadById (): Promise<LoadBarbecueById.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return {
        ...httpResponse.body,
        date: new Date(httpResponse.body.date)
      }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
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
