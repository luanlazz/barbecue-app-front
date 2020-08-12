import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { SaveParticipant } from '@/domain/usecases'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'

export class RemoteSaveParticipant implements SaveParticipant {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<SaveParticipant.Model>
  ) {}

  async save (participant: SaveParticipant.Params): Promise<SaveParticipant.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: participant
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
