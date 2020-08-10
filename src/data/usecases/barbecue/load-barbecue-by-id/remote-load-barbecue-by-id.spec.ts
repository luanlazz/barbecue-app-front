import { RemoteLoadBarbecueById } from './remote-load-barbecue-by-id'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadBarbecueById
  httpClientSpy: HttpClientSpy<RemoteLoadBarbecueById.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadBarbecueById.Model>()
  const sut = new RemoteLoadBarbecueById(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadBarbecueById', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    await sut.loadById()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })
})
