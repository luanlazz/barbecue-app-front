import { LoadBarbecueList } from '@/domain/usecases/load-barbecue-list'
import { BarbecueModel } from '@/domain/models'
import { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadBarbecueList implements LoadBarbecueList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<BarbecueModel[]> {
    await this.httpGetClient.get({ url: this.url })
    return null
  }
}
