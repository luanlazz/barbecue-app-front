import { RemoteSaveBarbecue } from './remote-save-barbecue'
import { HttpClientSpy } from '@/data/test'
import { mockBarbecueParams } from '@/domain/test/mock-barbecue'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveBarbecue
  httpClientSpy: HttpClientSpy<RemoteSaveBarbecue.Model[]>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveBarbecue.Model[]>()
  const sut = new RemoteSaveBarbecue(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveBarbecue', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.save(mockBarbecueParams())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })
})
