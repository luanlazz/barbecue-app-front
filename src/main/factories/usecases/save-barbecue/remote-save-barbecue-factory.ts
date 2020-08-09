import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { RemoteSaveBarbecue } from '@/data/usecases'
import { SaveBarbecue } from '@/domain/usecases'

export const makeRemoteSaveBarbecue = (): SaveBarbecue => {
  return new RemoteSaveBarbecue(makeApiUrl('/barbecue'), makeAuthorizeHttpClientDecorator())
}