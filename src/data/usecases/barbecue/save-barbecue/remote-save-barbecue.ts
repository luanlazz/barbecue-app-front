import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { SaveBarbecue } from '@/domain/usecases'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'

export class RemoteSaveBarbecue implements SaveBarbecue {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveBarbecue.Model>
  ) {}

  async save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: barbecue
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
