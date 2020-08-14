export interface SaveParticipant {
  save(participant: SaveParticipant.Params): Promise<SaveParticipant.Model>
}

export namespace SaveParticipant {
  export type Params ={
    id?: string
    name: string
    pay: boolean
    value: number
  }

  export type Model = {
    id: string
    barbecueId: string
    name: string
    pay: boolean
    value: number
  }
}
