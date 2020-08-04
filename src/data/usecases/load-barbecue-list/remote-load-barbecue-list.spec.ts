import { RemoteLoadBarbecueList } from './remote-load-barbecue-list'
import { HttpGetClientSpy } from '@/data/test'
import { BarbecueModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadBarbecueList
  httpGetClientSpy: HttpGetClientSpy<BarbecueModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<BarbecueModel>()
  const sut = new RemoteLoadBarbecueList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadBarbecueList', () => {
  test('Should call HttpGetClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
