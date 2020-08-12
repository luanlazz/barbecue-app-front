import React, { lazy } from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadParticipantsList, makeRemoteLoadBarbecueById, makeRemoteSaveBarbecue } from '@/main/factories/usecases'
import { makeSaveValidationBarbecue } from './participants-barbecue-validation-factory'

const ParticipantsList = lazy(async () => import('@/presentation/pages/participants-list/participants'))

export const makeParticipantsList: React.FC = () => {
  const { barbecueId } = useParams()

  return (
    <ParticipantsList
      loadParticipantsList={makeRemoteLoadParticipantsList(barbecueId)}
      loadBarbecueById={makeRemoteLoadBarbecueById(barbecueId)}
      saveBarbecue={makeRemoteSaveBarbecue(barbecueId)}
      validation={makeSaveValidationBarbecue()}
    />
  )
}
