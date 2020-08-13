export class InvalidFieldError extends Error {
  constructor () {
    super('Valor do campo é inválido')
    this.name = 'InvalidFieldError'
  }
}
