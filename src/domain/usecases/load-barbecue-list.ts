import { BarbecueModel } from '@/domain/models'

export interface AddAccount {
  loadAll (): Promise<BarbecueModel[]>
}
