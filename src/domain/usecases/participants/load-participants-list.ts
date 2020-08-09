export interface LoadParticipantsList {
  loadAll(): Promise<LoadParticipantsList.Model[]>
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
