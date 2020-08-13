import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteSaveParticipant } from '@/data/usecases'
import { SaveParticipant } from '@/domain/usecases'

export const makeRemoteSaveParticipant = (barbecueId: string, participantId?: string): SaveParticipant => {
  return new RemoteSaveParticipant(makeApiUrl(`/barbecue/${barbecueId}/participants/${participantId || ''}`), makeAuthorizeHttpClientDecorator())
}
