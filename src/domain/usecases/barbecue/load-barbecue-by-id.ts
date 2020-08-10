export interface LoadBarbecueById {
  loadById(): Promise<LoadBarbecueById.Model>
}

export namespace LoadBarbecueById {
  export type Model = {
    id: string
    accountId: string
    date: Date
    description: string
    observation: string
    valueSuggestDrink?: number
    valueSuggestFood?: number
    valueTotal?: number
    numParticipants?: number
    valueCollected?: number
  }
}
