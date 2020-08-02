export class InvalidFieldError extends Error {
  constructor (field: string) {
    super(`Valor do campo ${field} é inválido`)
    this.name = 'InvalidFieldError'
  }
}
