import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadBarbecueList } from '@/data/usecases'
import { LoadBarbecueList } from '@/domain/usecases'

export const makeRemoteLoadBarbecueList = (): LoadBarbecueList => {
  return new RemoteLoadBarbecueList(makeApiUrl('/barbecue'), makeAuthorizeHttpClientDecorator())
}
