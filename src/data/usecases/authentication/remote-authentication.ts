import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (params: AuthParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return Promise.resolve()
  }
}
