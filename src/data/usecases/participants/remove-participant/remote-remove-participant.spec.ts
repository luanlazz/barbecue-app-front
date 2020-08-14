import { RemoteRemoveParticipant } from './remote-remove-participant'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteRemoveParticipant
  httpClientSpy: HttpClientSpy<void>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<void>()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.noContent
  }
  const sut = new RemoteRemoveParticipant(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteRemoveParticipant', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.remove()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })

  test('Should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.remove()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
