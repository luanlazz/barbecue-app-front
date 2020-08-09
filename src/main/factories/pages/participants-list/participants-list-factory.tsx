import React, { lazy } from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadParticipantsList } from '../../usecases/load-participants/remote-load-participants-list-factory'

const ParticipantsList = lazy(async () => import('@/presentation/pages/participants-list/participants'))

export const makeParticipantsList: React.FC = () => {
  const { barbecueId } = useParams()

  return (
    <ParticipantsList
      loadParticipantsList={makeRemoteLoadParticipantsList(barbecueId)}
    />
  )
}
