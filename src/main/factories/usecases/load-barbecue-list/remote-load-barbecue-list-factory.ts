import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadBarbecueList } from '@/data/usecases/load-barbecue-list/remote-load-barbecue-list'
import { LoadBarbecueList } from '@/domain/usecases'

export const makeRemoteLoadBarbecueList = (): LoadBarbecueList => {
  return new RemoteLoadBarbecueList(makeApiUrl('/barbecue'), makeAxiosHttpClient())
}
