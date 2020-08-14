import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteRemoveParticipant } from '@/data/usecases'
import { RemoveParticipant } from '@/domain/usecases'

export const makeRemoteRemoveParticipant = (barbecueId: string, participantId?: string): RemoveParticipant => {
  return new RemoteRemoveParticipant(makeApiUrl(`/barbecue/${barbecueId}/participants/${participantId}`), makeAuthorizeHttpClientDecorator())
}
