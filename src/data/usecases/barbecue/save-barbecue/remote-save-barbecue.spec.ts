import { RemoteSaveBarbecue } from './remote-save-barbecue'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockRemoteBarbecueModel } from '@/data/test/mock-remote-barbecue'
import { mockBarbecueParams } from '@/domain/test/mock-barbecue'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveBarbecue
  httpClientSpy: HttpClientSpy<RemoteSaveBarbecue.Model>
}

const makeSut = (url: string = faker.internet.url(), response = mockRemoteBarbecueModel()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveBarbecue.Model>()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok,
    body: response
  }
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

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const barbecueParams = mockBarbecueParams()
    await sut.save(barbecueParams)
    expect(httpClientSpy.body).toBe(barbecueParams)
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

  test('Should return the barbecue on success', async () => {
    const httpResult = mockRemoteBarbecueModel()
    const { sut } = makeSut(null, httpResult)
    const barbecue = await sut.save(mockBarbecueParams())
    await expect(barbecue).toEqual({
      id: httpResult.id,
      accountId: httpResult.accountId,
      date: new Date(httpResult.date),
      description: httpResult.description,
      observation: httpResult.observation,
      valueSuggestDrink: httpResult.valueSuggestDrink,
      valueSuggestFood: httpResult.valueSuggestFood,
      valueTotal: httpResult.valueTotal,
      numParticipants: httpResult.numParticipants,
      valueCollected: httpResult.valueCollected
    })
  })
})
