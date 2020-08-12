import React, { useContext } from 'react'
import Styles from './participants-list-styles.scss'
import { ParticipantsContext, ParticipantItem, ParticipantsItensEmpty } from '@/presentation/pages/participants-list/components'

const ParticipantsListItems: React.FC = () => {
  const { state } = useContext(ParticipantsContext)

  return (
    <div className={Styles.participantsList}>
      {state.isLoadingParticipants
        ? <ParticipantsItensEmpty />
        : <table data-testid='participants-list'>
          <tbody>
            {state.participants.map(participant => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </tbody>
        </table>
      }
    </div>
  )
}

export default ParticipantsListItems
