import { RemoteSaveBarbecue } from './remote-save-barbecue'
import { HttpClientSpy } from '@/data/test'
import { mockBarbecueParams } from '@/domain/test/mock-barbecue'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http'

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

  test('Should throw UnexpectedError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockBarbecueParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.save(mockBarbecueParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockBarbecueParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
