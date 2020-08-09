import React, { lazy } from 'react'
import { makeRemoteLoadBarbecueList } from '@/main/factories/usecases/load-barbecue-list/remote-load-barbecue-list-factory'
import { makeRemoteSaveBarbecue } from '@/main/factories/usecases/save-barbecue/remote-save-barbecue-factory'
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
