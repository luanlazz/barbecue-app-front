import { RemoteLoadParticipantsList } from './remote-load-participants-list'
import { HttpClientSpy } from '@/data/test'
import { LoadParticipantsList } from '@/domain/usecases'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadParticipantsList
  httpClientSpy: HttpClientSpy<LoadParticipantsList.Model[]>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<LoadParticipantsList.Model[]>()
  const sut = new RemoteLoadParticipantsList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadParticipantsList', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })
})
