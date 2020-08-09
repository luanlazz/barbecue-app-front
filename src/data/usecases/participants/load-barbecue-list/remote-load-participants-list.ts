import { HttpClient } from '@/data/protocols/http'
import { LoadParticipantsList } from '@/domain/usecases'

export class RemoteLoadParticipantsList implements LoadParticipantsList {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadParticipantsList.Model[]>
  ) {}

  async loadAll (): Promise<LoadParticipantsList.Model[]> {
    await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    return null
  }
}
