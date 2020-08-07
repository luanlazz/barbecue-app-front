import { RemoteSaveBarbecue } from './remote-save-barbecue'
import { HttpPostClientSpy } from '@/data/test'
import { mockBarbecueParams } from '@/domain/test/mock-barbecue'
import faker from 'faker'

type SutTypes = {
  sut: RemoteSaveBarbecue
  httpPostClientSpy: HttpPostClientSpy<RemoteSaveBarbecue.Model[]>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteSaveBarbecue.Model[]>()
  const sut = new RemoteSaveBarbecue(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteSaveBarbecue', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.save(mockBarbecueParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
