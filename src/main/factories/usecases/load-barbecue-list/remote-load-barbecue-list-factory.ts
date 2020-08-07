import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadBarbecueList } from '@/data/usecases/load-barbecue-list/remote-load-barbecue-list'
import { LoadBarbecueList } from '@/domain/usecases'

export const makeRemoteLoadBarbecueList = (): LoadBarbecueList => {
  return new RemoteLoadBarbecueList(makeApiUrl('/barbecue'), makeAuthorizeHttpClientDecorator())
}
