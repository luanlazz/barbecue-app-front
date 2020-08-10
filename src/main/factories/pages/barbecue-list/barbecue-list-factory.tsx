import React, { lazy } from 'react'
import { makeRemoteSaveBarbecue, makeRemoteLoadBarbecueList } from '@/main/factories/usecases'
import { makeSaveValidation } from './save-validation-factory'

const BarbecueList = lazy(async () => import('@/presentation/pages/barbecue-list/barbecue-list'))

export const makeBarbecueList: React.FC = () => {
  return (
    <BarbecueList
      loadBarbecueList={makeRemoteLoadBarbecueList()}
      validation={makeSaveValidation()}
      saveBarbecue={makeRemoteSaveBarbecue()}
    />
  )
}
