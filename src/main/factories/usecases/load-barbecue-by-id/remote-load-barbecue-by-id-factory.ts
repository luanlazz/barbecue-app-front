import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadBarbecueById } from '@/data/usecases'
import { LoadBarbecueById } from '@/domain/usecases'

export const makeRemoteLoadBarbecueById = (barbecueId: string): LoadBarbecueById => {
  return new RemoteLoadBarbecueById(makeApiUrl(`/barbecue/${barbecueId}`), makeAuthorizeHttpClientDecorator())
}
