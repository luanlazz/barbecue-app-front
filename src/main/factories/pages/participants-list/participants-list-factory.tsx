import React, { lazy } from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteLoadParticipantsList, makeRemoteLoadBarbecueById } from '@/main/factories/usecases'

const ParticipantsList = lazy(async () => import('@/presentation/pages/participants-list/participants'))

export const makeParticipantsList: React.FC = () => {
  const { barbecueId } = useParams()

  return (
    <ParticipantsList
      loadParticipantsList={makeRemoteLoadParticipantsList(barbecueId)}
      loadBarbecueById={makeRemoteLoadBarbecueById(barbecueId)}
    />
  )
}
