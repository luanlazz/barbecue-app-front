export class UnexpectedError extends Error {
  constructor () {
    super('Ocorreu algo de errado, por favor retorne em breve')
    this.name = 'UnexpectedError'
  }
}
