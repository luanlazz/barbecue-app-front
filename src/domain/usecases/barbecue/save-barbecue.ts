export interface SaveBarbecue {
  save (barbecue: SaveBarbecue.Params): Promise<SaveBarbecue.Model>
}

export namespace SaveBarbecue {
  export type Params = {
    date: Date
    description: string
    observation: string
    valueSuggestDrink?: number
    valueSuggestFood?: number
  }

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
