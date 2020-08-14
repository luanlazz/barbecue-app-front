import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { RemoveParticipant } from '@/domain/usecases'
import { UnexpectedError } from '@/domain/errors'

export class RemoteRemoveParticipant implements RemoveParticipant {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async remove (): Promise<void> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.noContent: return null
      default: throw new UnexpectedError()
    }
  }
}
