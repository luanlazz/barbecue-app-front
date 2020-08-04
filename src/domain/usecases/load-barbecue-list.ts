import { BarbecueModel } from '@/domain/models'

export interface LoadBarbecueList {
  loadAll (): Promise<BarbecueModel[]>
}
