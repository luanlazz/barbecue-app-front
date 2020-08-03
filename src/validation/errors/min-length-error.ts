export class MinLengthError extends Error {
  constructor (field: string, length: Number) {
    super(`O campo ${field} deve ter o tamanho minimo de ${length.toString()}`)
    this.name = 'MinLengthError'
  }
}
