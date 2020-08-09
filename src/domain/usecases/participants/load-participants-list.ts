export interface LoadParticipantsList {
  loadAll(barbecueId: string): Promise<LoadParticipantsList.Model>
}

export namespace LoadParticipantsList {
  export type Model = {
    id: string
    barbecueId: string
    name: string
    pay: true
    value: number
  }
}
