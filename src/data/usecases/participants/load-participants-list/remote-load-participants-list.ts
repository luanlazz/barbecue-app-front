import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { LoadParticipantsList } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadParticipantsList implements LoadParticipantsList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadParticipantsList.Model[]>
  ) {}

  async loadAll (): Promise<LoadParticipantsList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
