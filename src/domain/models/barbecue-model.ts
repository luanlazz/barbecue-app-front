export type BarbecueModel = {
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
