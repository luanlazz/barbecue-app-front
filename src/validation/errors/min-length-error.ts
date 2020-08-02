export class MinLengthError extends Error {
  constructor (field: string, length: number) {
    super(`O campo ${field} deve ter o tamanho minimo de ${length}`)
    this.name = 'MinLengthError'
  }
}
