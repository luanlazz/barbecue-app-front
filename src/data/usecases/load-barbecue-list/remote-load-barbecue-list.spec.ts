import { RemoteLoadBarbecueList } from './remote-load-barbecue-list'
import { HttpClientSpy, mockRemoteBarbecuesModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadBarbecueList
  httpClientSpy: HttpClientSpy<RemoteLoadBarbecueList.Model[]>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadBarbecueList.Model[]>()
  const sut = new RemoteLoadBarbecueList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadBarbecueList', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('Should throw UnexpectedError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const barbecues = await sut.loadAll()
    expect(barbecues).toEqual([])
  })

  test('Should return a barbecueList if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteBarbecuesModel()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const barbecues = await sut.loadAll()
    expect(barbecues).toEqual([{
      id: httpResult[0].id,
      accountId: httpResult[0].accountId,
      date: new Date(httpResult[0].date),
      description: httpResult[0].description,
      observation: httpResult[0].observation,
      valueSuggestDrink: httpResult[0].valueSuggestDrink,
      valueSuggestFood: httpResult[0].valueSuggestFood,
      valueTotal: httpResult[0].valueTotal,
      numParticipants: httpResult[0].numParticipants,
      valueCollected: httpResult[0].valueCollected
    },{
      id: httpResult[1].id,
      accountId: httpResult[1].accountId,
      date: new Date(httpResult[1].date),
      description: httpResult[1].description,
      observation: httpResult[1].observation,
      valueSuggestDrink: httpResult[1].valueSuggestDrink,
      valueSuggestFood: httpResult[1].valueSuggestFood,
      valueTotal: httpResult[1].valueTotal,
      numParticipants: httpResult[1].numParticipants,
      valueCollected: httpResult[1].valueCollected
    }])
  })
})
