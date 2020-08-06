import React, { lazy } from 'react'
import { makeRemoteLoadBarbecueList } from '@/main/factories/usecases/load-barbecue-list/remote-load-barbecue-list-factory'

const BarbecueList = lazy(async () => import('@/presentation/pages/barbecue-list/barbecue-list'))

export const makeBarbecueList: React.FC = () => {
  return (
    <BarbecueList
      loadBarbecueList={makeRemoteLoadBarbecueList()}
    />
  )
}
