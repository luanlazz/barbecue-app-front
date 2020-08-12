import { RemoteSaveParticipant } from './remote-save-participant'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { SaveParticipant } from '@/domain/usecases'
import { mockParticipantParams, mockParticipantModel } from '@/domain/test'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveParticipant
  httpClientSpy: HttpClientSpy<SaveParticipant.Model>
}

const makeSut = (url: string = faker.internet.url(), response = mockParticipantModel()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<SaveParticipant.Model>()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok,
    body: response
  }
  const sut = new RemoteSaveParticipant(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveParticipant', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    await sut.save(mockParticipantParams())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })

  test('Should call HttpClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const participantParams = mockParticipantParams()
    await sut.save(participantParams)
    expect(httpClientSpy.body).toBe(participantParams)
  })

  test('Should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.save(mockParticipantParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw AccessDeniedError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockParticipantParams())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.save(mockParticipantParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockParticipantParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return the participant on success', async () => {
    const httpResult = mockParticipantModel()
    const { sut } = makeSut(null, httpResult)
    const participant = await sut.save(mockParticipantParams())
    await expect(participant).toEqual({
      id: httpResult.id,
      barbecueId: httpResult.barbecueId,
      name: httpResult.name,
      pay: httpResult.pay,
      value: httpResult.value
    })
  })
})
