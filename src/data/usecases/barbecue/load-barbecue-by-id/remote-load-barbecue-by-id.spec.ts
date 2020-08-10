import { RemoteLoadBarbecueById } from './remote-load-barbecue-by-id'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
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

  test('Should throw UnexpectedError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadById()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadById()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadById()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
