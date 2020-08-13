export class MinLengthError extends Error {
  constructor (field: string, length: Number) {
    super(`O tamanho minimo é de ${length.toString()} caracteres`)
    this.name = 'MinLengthError'
  }
}
