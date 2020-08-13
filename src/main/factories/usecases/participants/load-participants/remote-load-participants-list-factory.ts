import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteLoadParticipantsList } from '@/data/usecases'
import { LoadParticipantsList } from '@/domain/usecases'

export const makeRemoteLoadParticipantsList = (barbecueId: string): LoadParticipantsList => {
  return new RemoteLoadParticipantsList(makeApiUrl(`/barbecue/${barbecueId}/participants`), makeAuthorizeHttpClientDecorator())
}
