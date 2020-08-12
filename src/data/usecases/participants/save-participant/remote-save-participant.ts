import { HttpClient } from '@/data/protocols/http'
import { SaveParticipant } from '@/domain/usecases'

export class RemoteSaveParticipant implements SaveParticipant {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<SaveParticipant.Model>
  ) {}

  async save (participant: SaveParticipant.Params): Promise<SaveParticipant.Model> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: participant
    })
    return null
  }
}
