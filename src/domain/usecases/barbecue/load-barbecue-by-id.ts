
export interface LoadBarbecueById {
  loadById (barbecueId): Promise<LoadBarbecueList.Model>
}

export namespace LoadBarbecueList {
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
