import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const httpPostClientSpy = new HttpPostClientSpy()
    const url = 'anyl_url'
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
