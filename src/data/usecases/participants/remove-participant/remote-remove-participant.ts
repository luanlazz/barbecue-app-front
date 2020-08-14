import { HttpClient } from '@/data/protocols/http'
import { RemoveParticipant } from '@/domain/usecases'

export class RemoteRemoveParticipant implements RemoveParticipant {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  async remove (): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: 'put'
    })

    return null
  }
}
