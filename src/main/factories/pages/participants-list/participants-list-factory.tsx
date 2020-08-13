import React, { lazy } from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadParticipantsList, makeRemoteLoadBarbecueById, makeRemoteSaveBarbecue, makeRemoteSaveParticipant } from '@/main/factories/usecases'
import { makeSaveBarbecueValidation } from './barbecue-validation/barbecue-validation-factory'
import { makeSaveParticipantValidation } from './participant-validation/participant-validation-factory'

const ParticipantsList = lazy(async () => import('@/presentation/pages/participants-list/participants'))

export const makeParticipantsList: React.FC = () => {
  const { barbecueId } = useParams()
  const { participantId } = useParams()

  return (
    <ParticipantsList
      loadParticipantsList={makeRemoteLoadParticipantsList(barbecueId)}
      loadBarbecueById={makeRemoteLoadBarbecueById(barbecueId)}
      saveBarbecue={makeRemoteSaveBarbecue(barbecueId)}
      validationBarbecue={makeSaveBarbecueValidation()}
      saveParticipant={makeRemoteSaveParticipant(barbecueId, participantId)}
      validationParticipant={makeSaveParticipantValidation()}
    />
  )
}
