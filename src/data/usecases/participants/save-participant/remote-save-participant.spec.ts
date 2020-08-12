import { RemoteSaveParticipant } from './remote-save-participant'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { SaveParticipant } from '@/domain/usecases'
import { mockParticipantParams } from '@/domain/test'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveParticipant
  httpClientSpy: HttpClientSpy<SaveParticipant.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<SaveParticipant.Model>()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok
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
})
