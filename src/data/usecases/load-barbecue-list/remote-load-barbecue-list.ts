import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadBarbecueList } from '@/domain/usecases/load-barbecue-list'

export class RemoteLoadBarbecueList implements LoadBarbecueList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadBarbecueList.Model[]>
  ) {}

  async loadAll (): Promise<LoadBarbecueList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadBarbecueList {
  export type Model = LoadBarbecueList.Model
}
